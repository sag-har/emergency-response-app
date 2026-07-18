import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import StatusBadge from "./StatusBadge";

export default function EmergencyCard({
  item,
}) {
  return (
    <View style={styles.card}>

      <Text style={styles.type}>
        {item.Title}
      </Text>

      <Text style={styles.description}>
        {item.Description}
      </Text>

      <View style={styles.row}>

        <StatusBadge status={item.Status} />

        <Text style={styles.date}>
          {new Date(item.CreatedAt).toLocaleDateString()}
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },

  type: {
    fontWeight: "700",
    fontSize: 18,
    color: "#0F172A",
  },

  description: {
    color: "#64748B",
    marginVertical: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    color: "#94A3B8",
  },
});