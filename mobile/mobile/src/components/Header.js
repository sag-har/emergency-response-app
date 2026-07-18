import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function Header({
  title,
  navigation,
  showBack = true,
}) {
  return (
    <View style={styles.container}>

      {showBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={26}
            color="#0F172A"
          />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 26 }} />
      )}

      <Text style={styles.title}>
        {title}
      </Text>

      <View style={{ width: 26 }} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    elevation: 3,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },
});