import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import StatusCard from "../components/StatusCard";
import Timeline from "../components/Timeline";
import LiveTrackingMap from "../components/LiveTrackingMap";

import { PrimaryButton } from "../components";
import emergencyService from "../services/emergencyService";

// Live location is mocked server-side but still updates over time, so
// poll it periodically while this screen is focused.
const LOCATION_POLL_INTERVAL_MS = 5000;

export default function TrackingScreen({ navigation, route }) {
  // Safe extraction layer: extracts ID passed from creation or dashboard screens
  const currentEmergencyId =
    route?.params?.emergencyId || route?.params?.requestId || "REQ-00001";

  const hospital = route?.params?.selectedHospital || null;

  // 🛠️ FALLBACK BACKUP: Extract the full backup emergency object passed through navigation state
  const backupEmergency = route?.params?.emergency || null;

  const [status, setStatus] = useState(backupEmergency?.status || "Pending");
  const [eta, setEta] = useState("12 mins");
  const [loading, setLoading] = useState(false);

  const [userLocation, setUserLocation] = useState(null);
  const [ambulanceLocation, setAmbulanceLocation] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);

  useEffect(() => {
    loadTracking();
    loadLiveLocation();

    // Auto-assignment handler if user just came back from selecting a hospital
    if (hospital && currentEmergencyId) {
      handleHospitalAssignment(currentEmergencyId, hospital.id);
    }

    // Poll the mocked live-location endpoint so the ambulance marker
    // and ETA visibly progress while this screen is open.
    const pollId = setInterval(loadLiveLocation, LOCATION_POLL_INTERVAL_MS);
    return () => clearInterval(pollId);
  }, [currentEmergencyId, hospital]);

  const loadLiveLocation = async () => {
    if (!currentEmergencyId || currentEmergencyId === "REQ-00001") {
      setMapLoading(false);
      return;
    }

    try {
      const response = await emergencyService.getLiveLocation(currentEmergencyId);
      const liveData = response?.data;

      if (liveData) {
        setUserLocation(liveData.userLocation);
        setAmbulanceLocation(liveData.ambulanceLocation);
        setEta(`${liveData.etaMinutes} mins`);
      }
    } catch (error) {
      // Non-fatal — the map just shows its loading placeholder until
      // the next successful poll.
    } finally {
      setMapLoading(false);
    }
  };

  const loadTracking = async () => {
    if (!currentEmergencyId || currentEmergencyId === "REQ-00001") return;

    try {
      setLoading(true);

      const response = await emergencyService.getEmergencyById(currentEmergencyId);

      const liveData = response?.data || response;
      if (liveData && liveData.status) {
        setStatus(liveData.status);
        if (liveData.eta) setEta(liveData.eta);
      }
    } catch (error) {
      // Fall back to whatever status we already have locally so the
      // UI doesn't get stuck on a loading spinner if the lookup fails.
      if (error.response?.status === 404) {
        if (backupEmergency) {
          setStatus(backupEmergency.status || "Pending");
        } else {
          setStatus("Pending (Local Sync)");
        }
      } else {
        Alert.alert("Sync Issue", "Unable to synchronize real-time positioning matrix.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleHospitalAssignment = async (emergId, hospId) => {
    try {
      const response = await emergencyService.assignHospitalToEmergency(emergId, hospId);
      if (response.success) {
        Alert.alert("Success", "Hospital assigned and responders dispatched!");
        setStatus("Dispatched"); // Instantly update state visually
      }
    } catch (error) {
      Alert.alert("Sync Issue", "Unable to confirm hospital assignment. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Live Emergency Tracking</Text>
          <Text style={styles.subtitle}>Monitor the progress of your emergency request.</Text>
        </View>

        <View style={styles.requestCard}>
          <Text style={styles.label}>Request ID</Text>
          <Text style={styles.requestId}>{currentEmergencyId}</Text>
        </View>

        <StatusCard status={status} />

        <View style={styles.etaCard}>
          <Text style={styles.etaLabel}>Estimated Arrival</Text>
          <Text style={styles.eta}>🚑 {eta}</Text>
        </View>

        <View style={styles.mapWrapper}>
          <Text style={styles.mapHeading}>Responder Location</Text>
          <LiveTrackingMap
            userLocation={userLocation}
            ambulanceLocation={ambulanceLocation}
            loading={mapLoading}
          />
        </View>

        <Timeline currentStatus={status} />

        {hospital && (
          <View style={styles.hospitalCard}>
            <Text style={styles.hospitalHeading}>Selected Hospital</Text>
            <Text style={styles.hospitalName}>{hospital.name}</Text>
            <Text style={styles.info}>📍 {hospital.address}</Text>
            <Text style={styles.info}>📞 {hospital.phone}</Text>
            <Text style={styles.distance}>
              Distance: {hospital.distance_km || hospital.distance || "N/A"} km
            </Text>
          </View>
        )}

        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>Safety Tips</Text>
          <Text style={styles.noticeText}>
            Keep your phone nearby. Emergency responders may call you before reaching your location.
          </Text>
        </View>

        <PrimaryButton title="Refresh Tracking" loading={loading} onPress={loadTracking} style={{ marginBottom: 15 }} />

        <PrimaryButton
          title="Choose Hospital"
          color="#DC2626"
          onPress={() => navigation.navigate("HospitalSelection", { emergencyId: currentEmergencyId })}
          style={{ marginBottom: 15 }}
        />

        <PrimaryButton title="Go Home" color="#2563EB" onPress={() => navigation.navigate("Home")} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { padding: 20 },
  title: { fontSize: 28, fontWeight: "700", color: "#111827" },
  subtitle: { marginTop: 5, color: "#64748B" },
  requestCard: { backgroundColor: "#fff", marginHorizontal: 20, marginBottom: 15, padding: 18, borderRadius: 18, elevation: 3 },
  mapWrapper: { marginHorizontal: 20, marginBottom: 15 },
  mapHeading: { fontWeight: "700", fontSize: 16, marginBottom: 10, color: "#111827" },
  label: { color: "#64748B", marginBottom: 5 },
  requestId: { fontSize: 18, fontWeight: "700", color: "#111827" },
  etaCard: { backgroundColor: "#DC2626", marginHorizontal: 20, marginBottom: 18, borderRadius: 18, padding: 22, alignItems: "center" },
  etaLabel: { color: "#fff", fontSize: 15 },
  eta: { color: "#fff", fontSize: 30, fontWeight: "700", marginTop: 8 },
  hospitalCard: { backgroundColor: "#fff", marginHorizontal: 20, marginBottom: 18, padding: 18, borderRadius: 18, elevation: 3 },
  hospitalHeading: { fontSize: 17, fontWeight: "700", marginBottom: 12, color: "#111827" },
  hospitalName: { fontSize: 18, fontWeight: "700", color: "#2563EB", marginBottom: 8 },
  info: { color: "#475569", marginBottom: 5 },
  distance: { color: "#DC2626", marginTop: 8, fontWeight: "700" },
  noticeCard: { backgroundColor: "#FEF3C7", marginHorizontal: 20, marginBottom: 20, padding: 18, borderRadius: 18 },
  noticeTitle: { fontWeight: "700", color: "#92400E", marginBottom: 8 },
  noticeText: { color: "#92400E", lineHeight: 22 },
});