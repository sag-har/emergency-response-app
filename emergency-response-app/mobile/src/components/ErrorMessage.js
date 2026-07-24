import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function ErrorMessage({
  message,
}) {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 12,
    marginVertical: 10,
  },

  text: {
    color: "#991B1B",
    fontWeight: "600",
  },
});