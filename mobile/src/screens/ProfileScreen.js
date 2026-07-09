import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeToken } from "../storage/authStorage";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await AsyncStorage.getItem("user");

    if (data) {
      setUser(JSON.parse(data));
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await removeToken();
    await AsyncStorage.removeItem("user");

    navigation.replace("Login");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>No user found</Text>
      </View>
    );
  }

  const firstLetter = user.name?.charAt(0).toUpperCase();

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.role}>{user.role}</Text>
      </View>

      {/* INFO */}
      <View style={styles.infoCard}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user.phone}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Role</Text>
        <Text style={styles.value}>{user.role}</Text>
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f8",
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
    elevation: 4,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4f46e5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  avatarText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  role: {
    fontSize: 14,
    color: "gray",
  },

  infoCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },

  label: {
    fontSize: 12,
    color: "gray",
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
  },

  logoutBtn: {
    marginTop: 20,
    backgroundColor: "#e11d48",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});