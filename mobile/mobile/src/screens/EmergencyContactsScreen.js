import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function EmergencyContactsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Emergency Contacts</Text>

        <Text style={styles.subtitle}>
          Save trusted contacts for emergency notifications.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddContact")}
        >
          <Text style={styles.buttonText}>Add Contact</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    elevation: 4,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 10,
    textAlign: "center",
    color: "#64748B",
    marginBottom: 25,
  },

  button: {
    backgroundColor: "#D62828",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});