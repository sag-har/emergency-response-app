import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";

export default function SettingsScreen({ navigation }) {

  const clearCache = async () => {
    try {
      await AsyncStorage.clear();

      Alert.alert(
        "Success",
        "Application cache cleared successfully."
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to clear cache."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Header
        title="Settings"
        navigation={navigation}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.section}>
          <Text style={styles.heading}>
            Application
          </Text>

          <PrimaryButton
            title="Clear Cache"
            onPress={clearCache}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>
            About
          </Text>

          <View style={styles.aboutCard}>

            <Text style={styles.appName}>
              Emergency Response App
            </Text>

            <Text style={styles.version}>
              Version 1.0.0
            </Text>

            <Text style={styles.about}>
              This application helps citizens quickly
              report emergencies, choose hospitals,
              manage emergency contacts, receive
              notifications, and track the status of
              submitted emergency requests.
            </Text>

          </View>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 4,
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 20,
  },

  aboutCard: {
    alignItems: "center",
  },

  appName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#D62828",
  },

  version: {
    marginVertical: 10,
    color: "#64748B",
    fontSize: 15,
  },

  about: {
    textAlign: "center",
    lineHeight: 24,
    color: "#475569",
    fontSize: 15,
  },

});