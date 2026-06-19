import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MainNavigator from "./MainNavigator";
<<<<<<< HEAD
=======
import ConfirmationScreen from "../screens/ConfirmationScreen";
>>>>>>> 758cba2 (Updated files and UI)

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
<<<<<<< HEAD
=======
        {/* Authentication Screens */}
>>>>>>> 758cba2 (Updated files and UI)
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

<<<<<<< HEAD
=======
        {/* Main Application */}
>>>>>>> 758cba2 (Updated files and UI)
        <Stack.Screen
          name="Main"
          component={MainNavigator}
        />
<<<<<<< HEAD
=======

        {/* SOS Confirmation */}
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
        />
>>>>>>> 758cba2 (Updated files and UI)
      </Stack.Navigator>
    </NavigationContainer>
  );
}