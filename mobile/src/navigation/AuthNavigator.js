import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MainNavigator from "./MainNavigator";
import ConfirmationScreen from "../screens/ConfirmationScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Authentication Screens */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        {/* Main Application */}
        <Stack.Screen
          name="Main"
          component={MainNavigator}
        />

        {/* SOS Confirmation */}
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}