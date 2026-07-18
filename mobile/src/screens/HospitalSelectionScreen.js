import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import HospitalCard from "../components/HospitalCard";
import hospitalService from "../services/hospitalService";
import { LoadingSpinner, EmptyState, PrimaryButton } from "../components";

export default function HospitalSelectionScreen({ navigation, route }) {
  const emergencyId = route?.params?.emergencyId || null;

  const [location, setLocation] = useState({
    latitude: 33.6844,
    longitude: 73.0479,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState("");
  
  const locationSubscription = useRef(null);

  useEffect(() => {
    setupTrackingAndLoad();

    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, []);

  const setupTrackingAndLoad = async () => {
    try {
      setLoading(true);
      setError("");

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission denied. Please enable GPS tracking in your settings.");
        setLoading(false);
        return;
      }

      const initialLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      const currentCoords = {
        latitude: initialLocation.coords.latitude,
        longitude: initialLocation.coords.longitude,
      };
      
      setLocation(currentCoords);
      await fetchHospitalsFromAPI(currentCoords.latitude, currentCoords.longitude);

      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 20,
        },
        (newLocation) => {
          const updatedCoords = {
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          };
          setLocation(updatedCoords);
          fetchHospitalsFromAPI(updatedCoords.latitude, updatedCoords.longitude, true);
        }
      );

    } catch (err) {
      console.error("GPS/Initialization Error:", err);
      setError("Failed to access live GPS location tracking.");
      setLoading(false);
    }
  };

  const fetchHospitalsFromAPI = async (lat, lng, isBackground = false) => {
    try {
      if (!isBackground) setError("");
      
      const response = await hospitalService.getNearbyHospitals(lat, lng);
      
      let rawHospitals = [];
      if (Array.isArray(response)) {
        rawHospitals = response;
      } else if (response && Array.isArray(response.hospitals)) {
        rawHospitals = response.hospitals;
      } else if (response && response.data && Array.isArray(response.data.hospitals)) {
        rawHospitals = response.data.hospitals;
      } else if (response && Array.isArray(response.data)) {
        rawHospitals = response.data;
      }

      const parsedHospitals = rawHospitals.map(item => ({
        id: item.id || item.ID,
        name: item.name || item.Name,
        address: item.address || item.Address,
        lat: item.lat || item.Lat,
        lng: item.lng || item.Lng,
        phone: item.phone || item.Phone,
        distance_km: item.distance_km || item.distance_km === 0 ? item.distance_km : item.Distance_km,
        is_available: item.is_available !== undefined ? item.is_available : item.Is_available
      }));

      setHospitals(parsedHospitals);
    } catch (err) {
      if (!isBackground) {
        setError(err.message || "Network Error: Unable to fetch live hospitals data.");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchHospitalsFromAPI(location.latitude, location.longitude);
  };

  const openHospital = (hospital) => {
    navigation.navigate("HospitalDetail", {
      hospital,
      emergencyId,
    });
  };

  if (loading) {
    return <LoadingSpinner message="Locating your live position & scanning hospitals..." />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Connection / GPS Issue</Text>
        <Text style={styles.errorText}>{error}</Text>
        <PrimaryButton title="Retry Location Setup" onPress={setupTrackingAndLoad} style={{ marginTop: 25, width: "80%" }} />
      </SafeAreaView>
    );
  }

  if (hospitals.length === 0) {
    return (
      <EmptyState
        icon="🏥"
        title="No Hospitals Found Nearby"
        subtitle="We couldn't detect any active healthcare facilities around your coordinates."
        actionLabel="Refresh Search"
        onAction={onRefresh}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.subtitle}>Select an available medical responder station close to your live location.</Text>
        
        <View style={styles.gpsIndicator}>
          <View style={styles.pulseDot} />
          <Text style={styles.gpsText}>Live GPS Tracking Active ({location.latitude.toFixed(4)}, {location.longitude.toFixed(4)})</Text>
        </View>
      </View>

      <FlatList
        data={hospitals}
        keyExtractor={(item) => item.id?.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#DC2626"]} />}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <HospitalCard hospital={item} onPress={() => openHospital(item)} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
  title: { fontSize: 28, fontWeight: "700", color: "#111827" },
  subtitle: { marginTop: 6, color: "#64748B", lineHeight: 22, fontSize: 14 },
  gpsIndicator: { flexDirection: "row", alignItems: "center", marginTop: 12, backgroundColor: "#F1F5F9", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, alignSelf: "flex-start" },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#10B981", marginRight: 8 },
  gpsText: { fontSize: 12, color: "#475569", fontWeight: "500" },
  list: { paddingHorizontal: 18, paddingBottom: 30 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 30, backgroundColor: "#F8FAFC" },
  errorIcon: { fontSize: 65 },
  errorTitle: { marginTop: 15, fontSize: 24, fontWeight: "700", color: "#DC2626" },
  errorText: { marginTop: 10, color: "#64748B", textAlign: "center", lineHeight: 22 },
});