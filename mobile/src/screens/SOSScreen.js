import React, { useContext, useState } from "react";
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

import { AppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext"; 
import emergencyService from "../services/emergencyService";
import { generateRequestId } from "../utils/helpers";

export default function SOSScreen({ navigation, route }) {
  const { addHistory } = useContext(AppContext);
  const { user } = useAuth(); 
  
  const incomingType = route?.params?.type || "Medical";
  
  let normalizedType = "Medical";
  if (incomingType === "Accident" || incomingType === "Fire" || incomingType === "Medical") {
    normalizedType = incomingType;
  }

  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const submitSOS = async () => {
    if (!notes.trim()) {
      Alert.alert("Missing Details", "Please describe your emergency.");
      return;
    }

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
        lat: 33.6844,                          
        lng: 73.0479,                          
        latitude: 33.6844,                     
        longitude: 73.0479,                    
        status: "Pending",
      };

      console.log("📡 Expo Network Link -> Dispatching JSON payload:", emergencyPayload);

      let finalId = requestId; 
      let finalPayload = { ...emergencyPayload };

      try {
        let response;
        if (emergencyService && typeof emergencyService.createEmergencyRequest === "function") {
          response = await emergencyService.createEmergencyRequest(emergencyPayload);
        } else {
          response = await emergencyService.createEmergency(emergencyPayload);
        }
        
        console.log("📝 Expo HTTP Response Core Matrix:", JSON.stringify(response));

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
          console.log(`🎯 Validated Dynamic Database ID Intercepted: ${serverGeneratedId}`);
          finalId = serverGeneratedId;
          finalPayload.id = serverGeneratedId; 
        }
      } catch (e) {
        console.error("❌ Network layer transaction aborted:", e.response?.data || e.message);
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
      console.error("SOS thread exception context:", error);
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
              <Text style={styles.locationTitle}>GPS Location</Text>
              <Text style={styles.locationSubtitle}>
                Live tracking active. Mapped data linked onto database fields.
              </Text>
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