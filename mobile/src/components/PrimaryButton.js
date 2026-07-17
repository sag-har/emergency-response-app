import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        (loading || disabled) && styles.disabled,
      ]}
      disabled={loading || disabled}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D62828",
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 17,
  },

  disabled: {
    opacity: 0.6,
  },
});