import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function ProfileCard({
  user,
}) {
  return (
    <View style={styles.card}>

      <View style={styles.avatar}>
        <Text style={styles.letter}>
          {user.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <Text style={styles.name}>
        {user.name}
      </Text>

      <Text style={styles.phone}>
        {user.phone}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    alignItems: "center",
    padding: 25,
    elevation: 4,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#D62828",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  letter: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },

  name: {
    fontWeight: "700",
    fontSize: 22,
  },

  phone: {
    color: "#64748B",
    marginTop: 6,
  },
});