import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreenB from "../screens/HomeScreenB";
import HistoryScreen from "../screens/HistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SOSScreen from "../screens/SOSScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import TrackingScreen from "../screens/TrackingScreen";
import HospitalSelectionScreen from "../screens/HospitalSelectionScreen";
import HospitalDetailScreen from "../screens/HospitalDetailScreen";

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, navigation }) {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        // Hide these screens from the bottom navigation
        if (
          route.name === "SOS" ||
          route.name === "Confirmation" ||
          route.name === "Tracking" ||
          route.name === "HospitalSelection" ||
          route.name === "HospitalDetail"
        ) {
          return null;
        }

        const isFocused = state.index === index;

        let iconName = "home-outline";

        switch (route.name) {
          case "Home":
            iconName = isFocused ? "home" : "home-outline";
            break;

          case "History":
            iconName = isFocused ? "time" : "time-outline";
            break;

          case "Profile":
            iconName = isFocused ? "person" : "person-outline";
            break;
        }

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabButton}
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
                  color: isFocused ? "#D62828" : "#94A3B8",
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
      {/* Bottom Tabs */}

      <Tab.Screen
        name="Home"
        component={HomeScreenB}
      />

      <Tab.Screen
        name="History"
        component={HistoryScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />

      {/* Hidden Screens */}

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
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    height: 70,
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 10,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  tabButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
});