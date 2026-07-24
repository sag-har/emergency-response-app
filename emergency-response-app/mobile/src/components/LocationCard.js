import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LocationCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Responder Location</Text>

      <View style={styles.mapBox}>
        <Text style={styles.mapEmoji}>📍</Text>

        <Text style={styles.text}>
          Live GPS Tracking will be integrated in
          Phase 5.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },

  heading: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 15,
  },

  mapBox: {
    backgroundColor: "#EFF6FF",
    padding: 25,
    borderRadius: 14,
    alignItems: "center",
  },

  mapEmoji: {
    fontSize: 42,
    marginBottom: 10,
  },

  text: {
    textAlign: "center",
    color: "#475569",
  },
});