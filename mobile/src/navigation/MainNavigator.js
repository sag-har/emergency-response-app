import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Main Screens
import HomeScreenB from "../screens/HomeScreenB";
import HistoryScreen from "../screens/HistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationHistoryScreen from "../screens/NotificationHistoryScreen";

// Emergency Flow
import SOSScreen from "../screens/SOSScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import TrackingScreen from "../screens/TrackingScreen";

// Hospital Flow
import HospitalSelectionScreen from "../screens/HospitalSelectionScreen";
import HospitalDetailScreen from "../screens/HospitalDetailScreen";

// Contacts
import EmergencyContactsScreen from "../screens/EmergencyContactsScreen";
import AddContactScreen from "../screens/AddContactScreen";

// Settings
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, navigation }) {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const hiddenScreens = [
          "SOS",
          "Confirmation",
          "Tracking",
          "HospitalSelection",
          "HospitalDetail",
          "EmergencyContacts",
          "AddContact",
          "Settings",
        ];

        if (hiddenScreens.includes(route.name)) {
          return null;
        }

        const isFocused = state.index === index;

        let iconName = "ellipse";

        switch (route.name) {
          case "Home":
            iconName = isFocused ? "home" : "home-outline";
            break;

          case "History":
            iconName = isFocused ? "time" : "time-outline";
            break;

          case "Notifications":
            iconName = isFocused
              ? "notifications"
              : "notifications-outline";
            break;

          case "Profile":
            iconName = isFocused
              ? "person"
              : "person-outline";
            break;
        }

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(route.name)}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? "#D62828" : "#94A3B8"}
            />

            <Text
              style={[
                styles.label,
                {
                  color: isFocused
                    ? "#D62828"
                    : "#94A3B8",
                },
              ]}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {/* Visible Bottom Tabs */}

      <Tab.Screen
        name="Home"
        component={HomeScreenB}
      />

      <Tab.Screen
        name="History"
        component={HistoryScreen}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationHistoryScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />

      {/* Hidden Navigation Screens */}

      <Tab.Screen
        name="SOS"
        component={SOSScreen}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="Confirmation"
        component={ConfirmationScreen}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="Tracking"
        component={TrackingScreen}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="HospitalSelection"
        component={HospitalSelectionScreen}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="HospitalDetail"
        component={HospitalDetailScreen}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="EmergencyContacts"
        component={EmergencyContactsScreen}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="AddContact"
        component={AddContactScreen}
        options={{
          tabBarButton: () => null,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    height: 72,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
});