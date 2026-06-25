import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER SECTION */}
      <View style={styles.header}>
        <Text style={styles.logo}></Text>

        <Text style={styles.title}>Emergency Response</Text>

        <Text style={styles.subtitle}>
          Fast, Reliable & Life Saving Assistance
        </Text>
      </View>

      {/* FEATURES SECTION */}
      <View style={styles.featuresBox}>
        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}> Instant SOS Alert</Text>
          <Text style={styles.featureText}>
            Send emergency alerts with one tap
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}> Nearby Hospitals</Text>
          <Text style={styles.featureText}>
            Find hospitals near your location quickly
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}> Live Location</Text>
          <Text style={styles.featureText}>
            Share real-time location during emergency
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}> Emergency Contacts</Text>
          <Text style={styles.featureText}>
            Store and access important contacts fast
          </Text>
        </View>
      </View>

      {/* LOGIN /  */}
      <View style={styles.bottomBox}>
        <Text style={styles.bottomText}>Get started to continue</Text>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },

  header: {
    alignItems: "center",
    marginTop: 40,
  },

  logo: {
    fontSize: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#D32F2F",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
    textAlign: "center",
  },

  featuresBox: {
    marginTop: 30,
  },

  featureItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },

  featureText: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },

  bottomBox: {
    marginBottom: 30,
    alignItems: "center",
  },

  bottomText: {
    color: "#444",
    marginBottom: 12,
    fontSize: 14,
  },

  loginBtn: {
    backgroundColor: "#002F6C",
    width: "100%",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  registerBtn: {
    backgroundColor: "#D32F2F",
    width: "100%",
    padding: 14,
    borderRadius: 12,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});