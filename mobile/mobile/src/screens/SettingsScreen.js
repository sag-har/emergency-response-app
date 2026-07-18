import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../components/Header";

import PrimaryButton from "../components/PrimaryButton";

export default function SettingsScreen({
  navigation,
}) {

  const [notifications, setNotifications] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const [locationEnabled, setLocationEnabled] =
    useState(true);

  const clearCache = async () => {

    try {

      await AsyncStorage.removeItem("notifications");

      Alert.alert(
        "Success",
        "Application cache cleared successfully."
      );

    } catch {

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
            General
          </Text>

          <View style={styles.item}>

            <View>

              <Text style={styles.title}>
                Push Notifications
              </Text>

              <Text style={styles.subtitle}>
                Receive emergency updates
              </Text>

            </View>

            <Switch
              value={notifications}
              onValueChange={setNotifications}
            />

          </View>

          <View style={styles.item}>

            <View>

              <Text style={styles.title}>
                Location Services
              </Text>

              <Text style={styles.subtitle}>
                Share current location
              </Text>

            </View>

            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
            />

          </View>

          <View style={styles.item}>

            <View>

              <Text style={styles.title}>
                Dark Mode
              </Text>

              <Text style={styles.subtitle}>
                Enable dark appearance
              </Text>

            </View>

            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
            />

          </View>

        </View>

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
              This application allows users to
              submit emergency requests, track
              ambulances, choose hospitals,
              manage emergency contacts and
              receive live notifications.
            </Text>

          </View>

        </View>

      </ScrollView>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#F8FAFC",
  },

  section:{
    backgroundColor:"#fff",
    marginHorizontal:20,
    marginTop:20,
    padding:20,
    borderRadius:20,
    elevation:4,
  },

  heading:{
    fontSize:20,
    fontWeight:"700",
    marginBottom:20,
    color:"#0F172A",
  },

  item:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:20,
  },

  title:{
    fontSize:16,
    fontWeight:"600",
    color:"#0F172A",
  },

  subtitle:{
    color:"#64748B",
    marginTop:3,
  },

  aboutCard:{
    alignItems:"center",
  },

  appName:{
    fontSize:22,
    fontWeight:"700",
    color:"#D62828",
  },

  version:{
    marginVertical:10,
    color:"#64748B",
  },

  about:{
    textAlign:"center",
    lineHeight:24,
    color:"#475569",
  },

});