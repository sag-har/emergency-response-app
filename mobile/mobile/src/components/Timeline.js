import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Timeline({ currentStatus }) {
  const steps = [
    "Pending",
    "Accepted",
    "On The Way",
    "Arrived",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Response Timeline</Text>

      {steps.map((item, index) => {
        const active =
          steps.indexOf(currentStatus) >= index;

        return (
          <View key={item} style={styles.row}>
            <View
              style={[
                styles.circle,
                {
                  backgroundColor: active
                    ? "#D62828"
                    : "#CBD5E1",
                },
              ]}
            />

            <Text
              style={[
                styles.text,
                {
                  color: active
                    ? "#111827"
                    : "#94A3B8",
                  fontWeight: active ? "700" : "500",
                },
              ]}
            >
              {item}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
  },

  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 15,
  },

  text: {
    fontSize: 15,
  },
});