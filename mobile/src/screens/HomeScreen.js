import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";

import { getToken, removeToken } from "../storage/authStorage";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  // Navbar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: "#FFFFFF",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      headerTitle: () => null,
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <Text style={styles.logo}>RESCUE</Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerRightButton}
          onPress={isLoggedIn ? handleLogout : () => navigation.navigate("Login")}
        >
          <Text style={styles.headerRightText}>
            {isLoggedIn ? "Logout" : "Login"}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, isLoggedIn]);

  const checkAuth = async () => {
    try {
      const token = await getToken();
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await removeToken();
            setIsLoggedIn(false);
            navigation.replace("Home");
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero  */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Stay Safe, Stay Protected</Text>
          <Text style={styles.heroSubtitle}>
            Professional emergency response at your fingertips
          </Text>
        </View>

        {/* Features*/}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Our Services</Text>

          <Feature
            title="Instant SOS"
            desc="Send emergency alert with live location in one tap"
            icon=""
          />
          <Feature
            title="Nearby Help"
            desc="Find hospitals, police & ambulances instantly"
            icon=""
          />
          <Feature
            title="Live Tracking"
            desc="Real-time location sharing with responders"
            icon=""
          />
          <Feature
            title="Emergency Contacts"
            desc="Quick access to family & important numbers"
            icon=""
          />
        </View>

        {/* Bottom */}
        <View style={styles.bottomContainer}>
          <Text style={styles.statusText}>
            {isLoggedIn
              ? " You are logged in and fully protected"
              : " Login to unlock all emergency features"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Feature = ({ title, desc, icon }) => (
  <View style={styles.featureCard}>
    {/* <View style={styles.iconContainer}>
      <Text style={styles.icon}>{icon}</Text>
    </View> */}
    <View style={styles.featureTextContainer}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{desc}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  scrollContent: {
    paddingBottom: 40,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },

  headerLeft: { paddingLeft: 16 },
  logo: {
    fontSize: 24,
    fontWeight: "800",
    color: "#D32F2F",
    letterSpacing: 4,
  },
  headerRightButton: {
    marginRight: 16,
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "#FEE2E2",
  },
  headerRightText: {
    color: "#D32F2F",
    fontWeight: "600",
    fontSize: 16,
  },

  
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 25,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  heroTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1E2937",
    textAlign: "center",
    lineHeight: 32,
  },

  heroSubtitle: {
    fontSize: 15.5,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
  },

  
  featuresContainer: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E2937",
    marginBottom: 16,
  },

  featureCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#FEF2F2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  icon: {
    fontSize: 28,
  },

  featureTextContainer: {
    flex: 1,
    justifyContent: "center",
  },

  featureTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1E2937",
    marginBottom: 4,
  },

  featureDesc: {
    fontSize: 14.5,
    color: "#64748B",
    lineHeight: 20,
  },


  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
  },

  statusText: {
    fontSize: 15,
    color: "#475569",
    textAlign: "center",
  },
});