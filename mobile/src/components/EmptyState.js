import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function EmptyState({
  icon = "📭",
  title = "No Data",
  subtitle = "Nothing available.",
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>
        {icon}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  icon: {
    fontSize: 70,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 15,
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 8,
    textAlign: "center",
    color: "#64748B",
    lineHeight: 22,
  },
});