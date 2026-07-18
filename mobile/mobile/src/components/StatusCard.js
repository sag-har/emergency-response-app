import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatusCard({ status }) {
  const getColor = () => {
    switch (status) {
      case "Pending":
        return "#F59E0B";

      case "Accepted":
        return "#2563EB";

      case "On The Way":
        return "#9333EA";

      case "Arrived":
        return "#16A34A";

      default:
        return "#64748B";
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Current Status</Text>

      <View
        style={[
          styles.badge,
          {
            backgroundColor: getColor(),
          },
        ]}
      >
        <Text style={styles.badgeText}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 30,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});