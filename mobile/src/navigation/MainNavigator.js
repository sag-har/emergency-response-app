import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreenB from "../screens/HomeScreenB";
import HistoryScreen from "../screens/HistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SOSScreen from "../screens/SOSScreen";

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        if (route.name === "SOS") return null;

        const isFocused = state.index === index;

        let iconName = "home";
        if (route.name === "Home") iconName = isFocused ? "home" : "home-outline";
        if (route.name === "History") iconName = isFocused ? "time" : "time-outline";
        if (route.name === "Profile") iconName = isFocused ? "person" : "person-outline";

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
                { color: isFocused ? "#D62828" : "#94A3B8" },
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
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreenB} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

      <Tab.Screen
        name="SOS"
        component={SOSScreen}
        options={{ tabBarButton: () => null }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#fff",
    borderTopWidth: 0,
    elevation: 10,
    justifyContent: "space-between",
    paddingHorizontal: 30,
    alignItems: "center",
  },

  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
});