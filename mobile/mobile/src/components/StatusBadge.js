import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function StatusBadge({
  status,
}) {
  let background = "#FEF3C7";
  let color = "#92400E";

  if (status === "Resolved") {
    background = "#DCFCE7";
    color = "#166534";
  }

  if (status === "Dispatched") {
    background = "#DBEAFE";
    color = "#1D4ED8";
  }

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: background,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color,
          },
        ]}
      >
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 30,
  },

  text: {
    fontWeight: "700",
    fontSize: 13,
  },
});