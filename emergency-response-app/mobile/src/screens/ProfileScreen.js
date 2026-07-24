import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import * as authService from "../services/authService"; // 🛠️ FIX: Named import extraction pattern match
import AsyncStorage from "@react-native-async-storage/async-storage"; // Fallback cleaner

export default function ProfileScreen({ navigation }) {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadProfile = async () => {
      try {
        if (user?.id) {
          // Safeguard check taake method explicitly verified execute ho
          if (authService && typeof authService.getProfile === "function") {
            const response = await authService.getProfile(user.id);
            if (isMounted) {
              setProfile(response.success ? response.data : user);
            }
          } else {
            if (isMounted) setProfile(user);
          }
        } else if (isMounted) {
          setProfile(user);
        }
      } catch (error) {
        console.error("Profile payload synchronization fail:", error);
        if (isMounted) setProfile(user);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProfile();
    return () => { isMounted = false; };
  }, [user]);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            // Clear storage registries via service abstraction layer
            await authService.logout();
            if (signOut) await signOut();
            navigation.reset({ index: 0, routes: [{ name: "Login" }] });
          } catch (err) {
            console.error("Auth reset crash:", err);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D62828" />
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </SafeAreaView>
    );
  }

  const firstLetter = profile?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{firstLetter}</Text>
          </View>
          <Text style={styles.name}>{profile?.name || "User"}</Text>
          <Text style={styles.role}>{profile?.role || "Citizen"}</Text>
        </View>

        <Text style={styles.sectionTitle}>Account Information</Text>
        <View style={styles.section}>
          <View style={styles.infoCard}>
            <Ionicons name="person-outline" size={24} color="#D62828" />
            <View style={styles.infoContent}>
              <Text style={styles.cardLabel}>Full Name</Text>
              <Text style={styles.value}>{profile?.name || "-"}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="call-outline" size={24} color="#2563EB" />
            <View style={styles.infoContent}>
              <Text style={styles.cardLabel}>Phone Number</Text>
              <Text style={styles.value}>{profile?.phone || "-"}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="mail-outline" size={24} color="#16A34A" />
            <View style={styles.infoContent}>
              <Text style={styles.cardLabel}>Email</Text>
              <Text style={styles.value}>{profile?.email || "Not Available"}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#F59E0B" />
            <View style={styles.infoContent}>
              <Text style={styles.cardLabel}>Role</Text>
              <Text style={styles.value}>{profile?.role || "Citizen"}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate("EmergencyContacts")}>
          <Ionicons name="people" size={24} color="#2563EB" />
          <Text style={styles.menuText}>Emergency Contacts</Text>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate("NotificationHistory")}>
          <Ionicons name="notifications" size={24} color="#D62828" />
          <Text style={styles.menuText}>Notification History</Text>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings" size={24} color="#0EA5E9" />
          <Text style={styles.menuText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.appCard}>
          <Text style={styles.appTitle}>Rescue App ERS</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appCopyright}>© 2026 Emergency Response Team</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC" },
  loadingText: { marginTop: 15, color: "#64748B", fontSize: 16 },
  header: { backgroundColor: "#FFFFFF", alignItems: "center", paddingVertical: 30, marginBottom: 10, elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3 },
  avatar: { width: 110, height: 110, borderRadius: 55, backgroundColor: "#D62828", justifyContent: "center", alignItems: "center", marginBottom: 15 },
  avatarText: { color: "#FFFFFF", fontSize: 42, fontWeight: "bold" },
  name: { fontSize: 24, fontWeight: "bold", color: "#0F172A" },
  role: { marginTop: 5, color: "#64748B", fontSize: 15 },
  section: { marginHorizontal: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0F172A", marginHorizontal: 20, marginTop: 15, marginBottom: 12 },
  infoCard: { backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center", padding: 16, borderRadius: 16, marginBottom: 12, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  infoContent: { marginLeft: 15, flex: 1 },
  cardLabel: { color: "#64748B", fontSize: 13 },
  value: { marginTop: 4, fontSize: 16, fontWeight: "700", color: "#0F172A" },
  menuCard: { marginHorizontal: 20, backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center", padding: 16, borderRadius: 16, marginBottom: 12, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  menuText: { flex: 1, marginLeft: 15, fontWeight: "600", fontSize: 16, color: "#0F172A" },
  logoutButton: { marginHorizontal: 20, backgroundColor: "#D62828", height: 52, borderRadius: 14, justifyContent: "center", alignItems: "center", flexDirection: "row", marginTop: 20, },
  logoutButtonText: { color: "#FFFFFF", fontWeight: "700", marginLeft: 10, fontSize: 16 },
  appCard: { marginHorizontal: 20, backgroundColor: "#FFFFFF", borderRadius: 16, padding: 20, alignItems: "center", marginTop: 30, marginBottom: 40, elevation: 2 },
  appTitle: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  appVersion: { marginTop: 6, color: "#64748B", fontSize: 14 },
  appCopyright: { marginTop: 8, color: "#94A3B8", fontSize: 12, textAlign: "center" },
});