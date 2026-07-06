import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AvailabilityBadge({ available }) {
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: available ? "#DCFCE7" : "#FEE2E2",
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: available ? "#15803D" : "#DC2626",
          },
        ]}
      >
        {available ? "Available" : "Unavailable"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  text: {
    fontSize: 12,
    fontWeight: "700",
  },
});