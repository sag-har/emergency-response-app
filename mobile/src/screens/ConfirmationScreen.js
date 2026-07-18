import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import StatusCard from "../components/StatusCard";

export default function ConfirmationScreen({ route, navigation }) {
  // Safe extraction of parameters
  const {
    requestId,
    status = "Pending",
    emergencyType = "Medical",
    selectedHospital = null,
    emergency = null,
  } = route.params || {};

  const submittedTime = new Date().toLocaleString();

  // Tracking button validation — only block navigation if we genuinely
  // have no id at all. Client-generated "REQ-..." ids ARE valid DB ids:
  // the backend accepts and stores the id sent from SOSScreen as-is
  // (see createEmergencyRequest's `customId || id` handling), so a
  // "REQ-" prefix does not mean the record is missing from the database.
  const handleTrackEmergency = () => {
    if (!requestId) {
      Alert.alert(
        "Invalid Tracking ID",
        "Database record not found. Please ensure the emergency was submitted successfully."
      );
      return;
    }
    
    navigation.navigate("Tracking", {
      requestId,
      emergencyId: requestId,
      status,
      emergencyType,
      selectedHospital,
      emergency,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.successCircle}>
            <Text style={styles.successIcon}>✓</Text>
          </View>

          <Text style={styles.title}>Emergency Submitted</Text>
          <Text style={styles.subtitle}>
            Your emergency request has been sent successfully. The response team has been notified.
          </Text>

          <StatusCard status={status} />

          <View style={styles.infoCard}>
            <InfoRow label="Request ID" value={requestId || "N/A"} />
            <Divider />
            <InfoRow label="Emergency" value={emergencyType} />
            <Divider />
            <InfoRow label="Status" value={status} />
            <Divider />
            <InfoRow label="Submitted" value={submittedTime} />

            {selectedHospital && (
              <>
                <Divider />
                <InfoRow label="Hospital" value={selectedHospital.name} />
              </>
            )}
          </View>

          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>Next Step</Text>
            <Text style={styles.noteText}>
              You can now track the progress of your emergency request in real-time.
            </Text>
          </View>

          <TouchableOpacity style={styles.trackButton} onPress={handleTrackEmergency}>
            <Text style={styles.trackButtonText}>Track Emergency</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate("History")}>
            <Text style={styles.historyText}>View History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.homeText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  card: { backgroundColor: "#FFFFFF", borderRadius: 24, padding: 24, elevation: 6 },
  successCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#DCFCE7", justifyContent: "center", alignItems: "center", alignSelf: "center", marginBottom: 20 },
  successIcon: { fontSize: 52, color: "#16A34A", fontWeight: "bold" },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", color: "#0F172A" },
  subtitle: { marginTop: 10, textAlign: "center", color: "#64748B", lineHeight: 24, marginBottom: 25 },
  infoCard: { backgroundColor: "#F8FAFC", borderRadius: 18, padding: 18, marginTop: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 },
  label: { color: "#64748B", fontSize: 14, fontWeight: "600" },
  // Fixed: Removed invalid 'typeof' property
  value: { color: "#0F172A", fontWeight: "700", fontSize: 14, flex: 1, textAlign: "right", marginLeft: 15 },
  divider: { height: 1, backgroundColor: "#E2E8F0" },
  noteCard: { backgroundColor: "#EFF6FF", borderRadius: 15, padding: 16, marginTop: 25 },
  noteTitle: { fontWeight: "700", color: "#2563EB", marginBottom: 8, fontSize: 16 },
  noteText: { color: "#475569", lineHeight: 22 },
  trackButton: { backgroundColor: "#D62828", padding: 18, borderRadius: 15, marginTop: 30, alignItems: "center" },
  trackButtonText: { color: "#FFFFFF", fontSize: 17, fontWeight: "bold" },
  historyButton: { backgroundColor: "#2563EB", padding: 18, borderRadius: 15, marginTop: 15, alignItems: "center" },
  historyText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
  homeButton: { backgroundColor: "#E2E8F0", padding: 18, borderRadius: 15, marginTop: 15, alignItems: "center" },
  homeText: { color: "#0F172A", fontWeight: "bold", fontSize: 16 },
});