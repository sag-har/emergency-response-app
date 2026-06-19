import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { AppContext } from "../context/AppContext";

export default function ProfileScreen() {
  const { user } = useContext(AppContext);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            Alert.alert(
              "Logged Out",
              "Logout functionality will be connected later."
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </Text>
        </View>

        <Text style={styles.name}>
          {user?.name || "Guest User"}
        </Text>

        <Text style={styles.email}>
          {user?.email || "guest@email.com"}
        </Text>
      </View>

      {/* ACCOUNT SECTION */}
      <Text style={styles.sectionTitle}>
        Account Information
      </Text>

      <View style={styles.card}>
        <View style={styles.item}>
          <Text style={styles.icon}>📧</Text>

          <View>
            <Text style={styles.label}>
              Email Address
            </Text>

            <Text style={styles.value}>
              {user?.email || "Not Available"}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.item}>
          <Text style={styles.icon}>👤</Text>

          <View>
            <Text style={styles.label}>
              Full Name
            </Text>

            <Text style={styles.value}>
              {user?.name || "Not Available"}
            </Text>
          </View>
        </View>
      </View>

      {/* EMERGENCY INFO */}
      <Text style={styles.sectionTitle}>
        Emergency Information
      </Text>

      <View style={styles.card}>
        <View style={styles.item}>
          <Text style={styles.icon}>🚨</Text>

          <View>
            <Text style={styles.label}>
              Emergency Contact
            </Text>

            <Text style={styles.value}>
              Not Added Yet
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.item}>
          <Text style={styles.icon}>📍</Text>

          <View>
            <Text style={styles.label}>
              Location Services
            </Text>

            <Text style={styles.value}>
              Coming Soon
            </Text>
          </View>
        </View>
      </View>

      {/* SETTINGS */}
      <Text style={styles.sectionTitle}>
        Preferences
      </Text>

      <View style={styles.card}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.icon}>⚙️</Text>

          <View>
            <Text style={styles.label}>
              App Settings
            </Text>

            <Text style={styles.value}>
              Manage your preferences
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#D62828",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#D62828",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,

    elevation: 8,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "bold",
  },

  name: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
  },

  email: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 10,
    marginTop: 10,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 5,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 3,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },

  icon: {
    fontSize: 24,
    marginRight: 15,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },

  value: {
    color: "#64748B",
    marginTop: 3,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 15,
  },

  logoutButton: {
    backgroundColor: "#D62828",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,

    shadowColor: "#D62828",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,

    elevation: 6,
  },

  logoutText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});