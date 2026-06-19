import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ConfirmationScreen({
  route,
  navigation,
}) {
  const requestId =
    route?.params?.requestId ||
    `REQ-${Math.floor(Math.random() * 1000)}`;

  const status =
    route?.params?.status || "Pending";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>✅</Text>

        <Text style={styles.title}>
          SOS Submitted Successfully
        </Text>

        <Text style={styles.subtitle}>
          Your emergency request has been
          recorded and is awaiting response.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>
            Request ID
          </Text>

          <Text style={styles.value}>
            {requestId}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>
            Status
          </Text>

          <Text style={styles.status}>
            {status}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Home")
          }
        >
          <Text style={styles.buttonText}>
            Back To Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.historyButton}
          onPress={() =>
            navigation.navigate("History")
          }
        >
          <Text style={styles.historyText}>
            View History
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 25,
    alignItems: "center",
    elevation: 5,
  },

  icon: {
    fontSize: 70,
    marginBottom: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 10,
    textAlign: "center",
    color: "#64748B",
    lineHeight: 22,
    marginBottom: 25,
  },

  infoBox: {
    width: "100%",
    backgroundColor: "#F8FAFC",
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
  },

  label: {
    color: "#64748B",
    fontSize: 13,
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  status: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D62828",
  },

  button: {
    backgroundColor: "#D62828",
    width: "100%",
    padding: 16,
    borderRadius: 14,
    marginTop: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  historyButton: {
    marginTop: 15,
  },

  historyText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 15,
  },
});