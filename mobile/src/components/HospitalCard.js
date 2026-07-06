import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import AvailabilityBadge from "./AvailabilityBadge";

export default function HospitalCard({
  hospital,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() => onPress(hospital)}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.icon}>🏥</Text>

        <View style={styles.info}>
          <Text style={styles.name}>
            {hospital.name}
          </Text>

          <Text style={styles.address}>
            {hospital.address}
          </Text>
        </View>

        <AvailabilityBadge
          available={hospital.isAvailable}
        />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.label}>
            Distance
          </Text>

          <Text style={styles.distance}>
            {hospital.distance}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onPress(hospital)}
        >
          <Text style={styles.buttonText}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    fontSize: 32,
    marginRight: 14,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  address: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 14,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 16,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    fontSize: 12,
    color: "#94A3B8",
  },

  distance: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: "700",
    color: "#2563EB",
  },

  button: {
    backgroundColor: "#D62828",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});