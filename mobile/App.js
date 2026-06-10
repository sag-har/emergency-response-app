import React from 'react';
import AuthNavigator from './src/navigation/AuthNavigator';
import AppProvider from "./src/context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <AuthNavigator />
    </AppProvider>
  );
}