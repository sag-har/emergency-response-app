import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ConfirmationScreen({ route, navigation }) {
  const requestId =
    route?.params?.requestId || `REQ-${Math.floor(Math.random() * 100000)}`;

  const status = route?.params?.status || "Pending";

  const submittedTime = new Date().toLocaleString();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>

        <View style={styles.successCircle}>
          <Text style={styles.successIcon}>✓</Text>
        </View>

        <Text style={styles.title}>
          Emergency Alert Submitted
        </Text>

        <Text style={styles.subtitle}>
          Your SOS request has been received successfully.
          Our emergency response system is now processing
          your request.
        </Text>

        <View style={styles.infoCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Request ID</Text>
            <Text style={styles.value}>{requestId}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{status}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Submitted</Text>
            <Text style={styles.value}>{submittedTime}</Text>
          </View>
        </View>

        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>Information</Text>

          <Text style={styles.note}>
            You can monitor the live progress of your emergency
            request from the Tracking screen.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.trackButton}
          onPress={() =>
            navigation.navigate("Tracking", {
              requestId,
              status,
            })
          }
        >
          <Text style={styles.trackButtonText}>
            Track Emergency
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.homeText}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.historyButton}
            onPress={() => navigation.navigate("History")}
          >
            <Text style={styles.historyText}>
              History
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 25,
    elevation: 8,
  },

  successCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },

  successIcon: {
    fontSize: 50,
    color: "#16A34A",
    fontWeight: "bold",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 12,
    textAlign: "center",
    color: "#64748B",
    lineHeight: 23,
    marginBottom: 25,
  },

  infoCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 4,
  },

  label: {
    color: "#64748B",
    fontSize: 14,
  },

  value: {
    fontWeight: "700",
    color: "#0F172A",
    fontSize: 14,
    flex: 1,
    textAlign: "right",
    marginLeft: 10,
  },

  statusBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: "#B45309",
    fontWeight: "700",
  },

  noteBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: 15,
    padding: 16,
    marginTop: 22,
  },

  noteTitle: {
    fontWeight: "700",
    color: "#1D4ED8",
    marginBottom: 6,
  },

  note: {
    color: "#475569",
    lineHeight: 22,
  },

  trackButton: {
    backgroundColor: "#D62828",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 28,
  },

  trackButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
  },

  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  homeButton: {
    flex: 1,
    marginRight: 8,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
  },

  historyButton: {
    flex: 1,
    marginLeft: 8,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
  },

  homeText: {
    color: "#0F172A",
    fontWeight: "700",
  },

  historyText: {
    color: "#fff",
    fontWeight: "700",
  },
});