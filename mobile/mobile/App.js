import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import AppProvider from "./src/context/AppContext";
import AuthNavigator from "./src/navigation/AuthNavigator";

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </AppProvider>
    </AuthProvider>
  );
}