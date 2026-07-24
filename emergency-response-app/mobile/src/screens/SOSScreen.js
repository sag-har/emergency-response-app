import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";

import { AppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext"; 
import emergencyService from "../services/emergencyService";
import { generateRequestId } from "../utils/helpers";

// Fallback used only if GPS permission is denied or a fix can't be
// obtained in time, so the flow never hard-fails on location alone.
const FALLBACK_COORDS = { latitude: 33.6844, longitude: 73.0479 };

export default function SOSScreen({ navigation, route }) {
  const { addHistory } = useContext(AppContext);
  const { user } = useAuth(); 
  
  const incomingType =
  route?.params?.emergencyType ||
  route?.params?.type ||
  "General";

let normalizedType = incomingType;

if (normalizedType === "Police") {
  normalizedType = "Crime";
}

console.log("Received Type:", incomingType);
console.log("Normalized Type:", normalizedType);

  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(true);
  const [coords, setCoords] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    fetchDeviceLocation();
  }, []);

  const fetchDeviceLocation = async () => {
    try {
      setLocating(true);
      setLocationError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationError("Location permission denied — using an approximate default location.");
        setCoords(FALLBACK_COORDS);
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      setLocationError("Unable to get your current location — using an approximate default location.");
      setCoords(FALLBACK_COORDS);
    } finally {
      setLocating(false);
    }
  };

  const submitSOS = async () => {
    if (!notes.trim()) {
      Alert.alert("Missing Details", "Please describe your emergency.");
      return;
    }

    const activeCoords = coords || FALLBACK_COORDS;

    try {
      setLoading(true);
      const requestId = generateRequestId();

      const emergencyPayload = {
        id: requestId,
        customId: requestId,
        user_id: user?.id || "USR-DUMMY-9992", 
        emergency_type: normalizedType,       
        emergencyType: normalizedType,        
        notes: notes.trim(),
        lat: activeCoords.latitude,
        lng: activeCoords.longitude,
        latitude: activeCoords.latitude,
        longitude: activeCoords.longitude,
        status: "Pending",
      };

      let finalId = requestId; 
      let finalPayload = { ...emergencyPayload };

      try {
        let response;
        if (emergencyService && typeof emergencyService.createEmergencyRequest === "function") {
          response = await emergencyService.createEmergencyRequest(emergencyPayload);
        } else {
          response = await emergencyService.createEmergency(emergencyPayload);
        }

        const serverGeneratedId = 
          response?.data?.id || 
          response?.id || 
          response?.requestId ||
          response?.data?.requestId ||
          response?.data?.insertedId || 
          response?.data?.inserted_id ||
          response?.data?.emergency?.id ||
          response?.data?.data?.id ||
          response?.insertedId;
        
        if (serverGeneratedId) {
          finalId = serverGeneratedId;
          finalPayload.id = serverGeneratedId; 
        }
      } catch (e) {
        Alert.alert(
          "Database Connection Error", 
          "Server could not write the request record. Verify your local IP address in services config."
        );
        return; 
      }

      addHistory(finalPayload);

      // Expo Engine Safe Navigation Switch
      navigation.replace("Confirmation", {
        requestId: String(finalId),
        emergencyId: String(finalId),
        emergency: finalPayload,
        status: "Pending",
        emergencyType: normalizedType,
      });
    } catch (error) {
      Alert.alert("Submission Failure", "Unable to broadcast emergency tracking package.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Emergency Request</Text>
        <Text style={styles.subtitle}>Fill in the information below.</Text>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Emergency Type</Text>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{normalizedType}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Current Location</Text>
          <View style={styles.locationBox}>
            <Text style={styles.locationIcon}>📍</Text>
            <View style={{ flex: 1 }}>
              {locating ? (
                <>
                  <Text style={styles.locationTitle}>Getting GPS fix…</Text>
                  <Text style={styles.locationSubtitle}>Please wait a moment.</Text>
                </>
              ) : (
                <>
                  <Text style={styles.locationTitle}>
                    {coords ? `${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}` : "Location unavailable"}
                  </Text>
                  <Text style={styles.locationSubtitle}>
                    {locationError || "This is the location that will be sent with your request."}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Emergency Details</Text>
          <TextInput
            multiline
            value={notes}
            onChangeText={setNotes}
            placeholder="Describe your emergency situation..."
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />
        </View>

        <View style={styles.noticeBox}>
          <Text style={styles.noticeTitle}>Emergency Notice</Text>
          <Text style={styles.noticeText}>
            False emergency requests may delay help for someone who really needs assistance.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          disabled={loading}
          onPress={submitSOS}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Submit Emergency</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { padding: 20 },
  title: { fontSize: 28, fontWeight: "700", color: "#111827", marginTop: 10 },
  subtitle: { color: "#64748B", marginBottom: 20, marginTop: 5 },
  card: { backgroundColor: "#fff", padding: 18, borderRadius: 18, marginBottom: 18, elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  sectionLabel: { fontWeight: "700", fontSize: 15, marginBottom: 12, color: "#111827" },
  typeBadge: { backgroundColor: "#FEE2E2", alignSelf: "flex-start", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 30 },
  typeText: { color: "#DC2626", fontWeight: "700" },
  locationBox: { flexDirection: "row", alignItems: "center" },
  locationIcon: { fontSize: 28, marginRight: 12 },
  locationTitle: { fontWeight: "700", color: "#111827" },
  locationSubtitle: { color: "#64748B", marginTop: 3 },
  input: { backgroundColor: "#F8FAFC", borderRadius: 12, minHeight: 140, padding: 15, textAlignVertical: "top", color: "#111827" },
  noticeBox: { backgroundColor: "#FEF3C7", padding: 18, borderRadius: 16, marginBottom: 25 },
  noticeTitle: { fontWeight: "700", color: "#92400E", marginBottom: 6 },
  noticeText: { color: "#92400E", lineHeight: 22 },
  button: { backgroundColor: "#DC2626", padding: 18, borderRadius: 16, alignItems: "center", marginBottom: 30 },
  buttonDisabled: { backgroundColor: "#EF4444", opacity: 0.7 },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "700" },
});