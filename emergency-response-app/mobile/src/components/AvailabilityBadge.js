import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function AvailabilityBadge({
  available,
}) {
  return (
    <View
      style={[
        styles.badge,
        available
          ? styles.available
          : styles.unavailable,
      ]}
    >
      <Text style={styles.text}>
        {available
          ? "Available"
          : "Unavailable"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  available: {
    backgroundColor: "#DCFCE7",
  },

  unavailable: {
    backgroundColor: "#FEE2E2",
  },

  text: {
    fontWeight: "700",
    fontSize: 12,
  },
});