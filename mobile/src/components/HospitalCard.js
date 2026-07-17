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
      style={styles.card}
      onPress={() => onPress(hospital)}
      activeOpacity={0.9}
    >
      <View style={styles.topRow}>
        <Text style={styles.icon}>🏥</Text>

        <AvailabilityBadge
          available={hospital.is_available}
        />
      </View>

      <Text style={styles.name}>
        {hospital.name}
      </Text>

      <Text style={styles.address}>
        📍 {hospital.address}
      </Text>

      <Text style={styles.phone}>
        ☎ {hospital.phone}
      </Text>

      {hospital.distance && (
        <View style={styles.distanceBox}>
          <Text style={styles.distance}>
            📏 {hospital.distance}
          </Text>
        </View>
      )}
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  icon: {
    fontSize: 32,
  },

  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  address: {
    marginTop: 8,
    color: "#64748B",
    fontSize: 14,
  },

  phone: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 14,
  },

  distanceBox: {
    alignSelf: "flex-start",
    backgroundColor: "#FEF3C7",
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  distance: {
    color: "#92400E",
    fontWeight: "700",
  },
});