import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 🔥 Sahi Screens Imports
import HomeScreen from "../screens/HomeScreen"; // HomeScreenB ko simple HomeScreen kar diya
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MainNavigator from "./MainNavigator";
import ConfirmationScreen from "../screens/ConfirmationScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    // ✨ NavigationContainer yahan se hata diya kyunki yeh App.js mein lag chuka hai
    <Stack.Navigator
      initialRouteName="Login" // Demo ke liye initial direct Login rakhein taake Sana ka UI dikhe
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Authentication Screens */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      
      {/* Landing/Welcome Screen (Agar use karni ho) */}
      <Stack.Screen name="Home" component={HomeScreen} />

      {/* Main Application (Azhar ke Bottom Tabs) */}
      <Stack.Screen name="MainHome" component={MainNavigator} />

      {/* SOS Confirmation Screen */}
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
    </Stack.Navigator>
  );
}