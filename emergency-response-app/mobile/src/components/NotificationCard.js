import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function NotificationCard({
  notification,
}) {
  return (
    <View style={styles.card}>

      <Text style={styles.title}>
        {notification.title}
      </Text>

      <Text style={styles.message}>
        {notification.message}
      </Text>

      <Text style={styles.time}>
        {notification.created_at}
      </Text>

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

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  message: {
    marginVertical: 8,
    color: "#64748B",
    lineHeight: 22,
  },

  time: {
    color: "#94A3B8",
    fontSize: 12,
  },
});