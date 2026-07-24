import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";

export default function TextInputField(props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="#94A3B8"
        {...props}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },

  input: {
    height: 55,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    fontSize: 15,
  },
});