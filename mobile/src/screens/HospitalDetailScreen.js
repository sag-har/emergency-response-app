import React, { useState } from "react";
import { SafeAreaView, View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import AvailabilityBadge from "../components/AvailabilityBadge";
import { PrimaryButton } from "../components";
import hospitalService from "../services/hospitalService";

export default function HospitalDetailScreen({ route, navigation }) {
  const { hospital, emergencyId } = route.params;
  const [loading, setLoading] = useState(false);

  const handleSelectHospital = async () => {
    try {
      setLoading(false);
      const cleanHospitalId = hospital.id || hospital._id || hospital.ID;

      console.log("⚡ Frontend Attempting To Assign:");
      console.log("Emergency ID Parameter:", emergencyId);
      console.log("Extracted Hospital ID:", cleanHospitalId);

      if (!emergencyId) {
        navigation.replace("Tracking", {
          emergencyId: null,
          selectedHospital: hospital,
        });
        return;
      }

      if (!cleanHospitalId) {
        Alert.alert("Data Mismatch", "Unable to trace an ID for the selected hospital.");
        return;
      }

      setLoading(true);
      
      // Execute assignment service call mapping directly to updated POST route payload keys
      await hospitalService.assignHospital(String(emergencyId).trim(), String(cleanHospitalId).trim());

      Alert.alert(
        "Hospital Selected",
        "Hospital assigned successfully.",
        [
          {
            text: "Track Ambulance",
            onPress: () =>
              navigation.replace("Tracking", {
                emergencyId: emergencyId,
                selectedHospital: hospital,
              }),
          },
        ]
      );
    } catch (error) {
      console.error("Frontend Assignment Crash:", error);
      Alert.alert(
        "Assignment Failed",
        error.response?.data?.message || error.message || "404 Endpoint Not Found on Server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.icon}>🏥</Text>
          <Text style={styles.title}>{hospital.name}</Text>
          <AvailabilityBadge available={hospital.is_available} />

          <View style={styles.divider} />

          <InfoRow label="Address" value={hospital.address} />
          <InfoRow label="Phone" value={hospital.phone} />
          <InfoRow label="Distance" value={hospital.distance_km ? `${hospital.distance_km} km` : "Unknown"} />
          <InfoRow label="Latitude" value={hospital.lat?.toString()} />
          <InfoRow label="Longitude" value={hospital.lng?.toString()} />

          <View style={styles.divider} />

          <Text style={styles.description}>
            Selecting this hospital will assign your emergency request to the nearest
            available emergency response team.
          </Text>

          <PrimaryButton title="Select Hospital" loading={loading} onPress={handleSelectHospital} />
          <PrimaryButton title="Back" color="#64748B" style={{ marginTop: 15 }} onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || "N/A"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 20, paddingBottom: 40 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 20, padding: 22, elevation: 4 },
  icon: { fontSize: 70, textAlign: "center" },
  title: { fontSize: 24, fontWeight: "700", color: "#111827", textAlign: "center", marginTop: 10, marginBottom: 15 },
  divider: { height: 1, backgroundColor: "#E2E8F0", marginVertical: 18 },
  row: { marginBottom: 14 },
  label: { color: "#64748B", fontSize: 13, marginBottom: 4 },
  value: { fontSize: 16, color: "#111827", fontWeight: "600" },
  description: { color: "#64748B", lineHeight: 23, marginBottom: 25 },
});