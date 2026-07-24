import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Authentication
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

// Main Navigation
import MainNavigator from "./MainNavigator";

// User
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

// Emergency Flow
import ConfirmationScreen from "../screens/ConfirmationScreen";
import TrackingScreen from "../screens/TrackingScreen";
import HistoryScreen from "../screens/HistoryScreen";

// Hospital Flow
import HospitalSelectionScreen from "../screens/HospitalSelectionScreen";
import HospitalDetailScreen from "../screens/HospitalDetailScreen";

// Contacts
import EmergencyContactsScreen from "../screens/EmergencyContactsScreen";
import AddContactScreen from "../screens/AddContactScreen";

// Notifications
import NotificationHistoryScreen from "../screens/NotificationHistoryScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {/* ===========================
          Landing
      =========================== */}

      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      {/* ===========================
          Authentication
      =========================== */}

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />

      {/* ===========================
          Main App
      =========================== */}

      <Stack.Screen
        name="Main"
        component={MainNavigator}
      />

      {/* ===========================
          User
      =========================== */}

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />

      {/* ===========================
          Emergency Flow
      =========================== */}

      <Stack.Screen
        name="Confirmation"
        component={ConfirmationScreen}
      />

      <Stack.Screen
        name="Tracking"
        component={TrackingScreen}
      />

      <Stack.Screen
        name="History"
        component={HistoryScreen}
      />

      {/* ===========================
          Hospitals
      =========================== */}

      <Stack.Screen
        name="HospitalSelection"
        component={HospitalSelectionScreen}
      />

      <Stack.Screen
        name="HospitalDetail"
        component={HospitalDetailScreen}
      />

      {/* ===========================
          Emergency Contacts
      =========================== */}

      <Stack.Screen
        name="EmergencyContacts"
        component={EmergencyContactsScreen}
      />

      <Stack.Screen
        name="AddContact"
        component={AddContactScreen}
      />

      {/* ===========================
          Notifications
      =========================== */}

      <Stack.Screen
        name="NotificationHistory"
        component={NotificationHistoryScreen}
      />
    </Stack.Navigator>
  );
}