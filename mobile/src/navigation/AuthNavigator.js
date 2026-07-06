import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MainNavigator from "./MainNavigator";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import TrackingScreen from "../screens/TrackingScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Landing Screen */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      {/* Authentication */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />

      {/* Main App */}
      <Stack.Screen
        name="Main"
        component={MainNavigator}
      />

      {/* SOS Confirmation */}
      <Stack.Screen
        name="Confirmation"
        component={ConfirmationScreen}
      />

      {/* Week 4 Tracking Screen */}
      <Stack.Screen
        name="Tracking"
        component={TrackingScreen}
      />
    </Stack.Navigator>
  );
}