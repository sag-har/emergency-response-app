import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MainNavigator from "./MainNavigator";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import TrackingScreen from "../screens/TrackingScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
<<<<<<< HEAD
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Landing Screen */}
=======
      screenOptions={{ headerShown: false }}
    >
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

<<<<<<< HEAD
      {/* Authentication */}
=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />

<<<<<<< HEAD
      {/* Main App */}
=======
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />

>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
      <Stack.Screen
        name="Main"
        component={MainNavigator}
      />

<<<<<<< HEAD
      {/* SOS Confirmation */}
=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
      <Stack.Screen
        name="Confirmation"
        component={ConfirmationScreen}
      />
<<<<<<< HEAD

      {/* Week 4 Tracking Screen */}
      <Stack.Screen
        name="Tracking"
        component={TrackingScreen}
      />
=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
    </Stack.Navigator>
  );
}