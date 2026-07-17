import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import StatusCard from "../components/StatusCard";
import Timeline from "../components/Timeline";
import LocationCard from "../components/LocationCard";

import { PrimaryButton } from "../components";
import emergencyService from "../services/emergencyService";

export default function TrackingScreen({ navigation, route }) {

  const requestId =
    route?.params?.requestId || "REQ-00001";

  const hospital =
    route?.params?.selectedHospital || null;

  const [status, setStatus] =
    useState("Pending");

  const [eta, setEta] =
    useState("12 mins");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    loadTracking();

    const timer1 = setTimeout(() => {
      setStatus("Accepted");
      setEta("9 mins");
    }, 4000);

    const timer2 = setTimeout(() => {
      setStatus("On The Way");
      setEta("5 mins");
    }, 8000);

    const timer3 = setTimeout(() => {
      setStatus("Arrived");
      setEta("0 mins");
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };

  }, []);

  const loadTracking = async () => {

    try {

      setLoading(true);

      try {
        await emergencyService.getEmergency(requestId);
      } catch (e) {}

    } catch (error) {

      Alert.alert(
        "Tracking",
        "Unable to refresh tracking."
      );

    } finally {
      setLoading(false);
    }

  };

    return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >

        <View style={styles.header}>
          <Text style={styles.title}>
            Live Emergency Tracking
          </Text>

          <Text style={styles.subtitle}>
            Monitor the progress of your emergency request.
          </Text>
        </View>

        <View style={styles.requestCard}>

          <Text style={styles.label}>
            Request ID
          </Text>

          <Text style={styles.requestId}>
            {requestId}
          </Text>

        </View>

        <StatusCard status={status} />

        <View style={styles.etaCard}>

          <Text style={styles.etaLabel}>
            Estimated Arrival
          </Text>

          <Text style={styles.eta}>
            🚑 {eta}
          </Text>

        </View>

        <LocationCard />

        <Timeline currentStatus={status} />

        {hospital && (

          <View style={styles.hospitalCard}>

            <Text style={styles.hospitalHeading}>
              Selected Hospital
            </Text>

            <Text style={styles.hospitalName}>
              {hospital.name}
            </Text>

            <Text style={styles.info}>
              📍 {hospital.address}
            </Text>

            <Text style={styles.info}>
              📞 {hospital.phone}
            </Text>

            <Text style={styles.distance}>
              Distance : {hospital.distance}
            </Text>

          </View>

        )}

        <View style={styles.noticeCard}>

          <Text style={styles.noticeTitle}>
            Safety Tips
          </Text>

          <Text style={styles.noticeText}>
            Keep your phone nearby. Emergency responders
            may call you before reaching your location.
          </Text>

        </View>

        <PrimaryButton
          title="Refresh Tracking"
          loading={loading}
          onPress={loadTracking}
          style={{ marginBottom: 15 }}
        />

        <PrimaryButton
          title="Choose Hospital"
          color="#DC2626"
          onPress={() =>
            navigation.navigate("HospitalSelection")
          }
          style={{ marginBottom: 15 }}
        />

        <PrimaryButton
          title="Go Home"
          color="#2563EB"
          onPress={() =>
            navigation.navigate("Home")
          }
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#F8FAFC",
  },

  header:{
    padding:20,
  },

  title:{
    fontSize:28,
    fontWeight:"700",
    color:"#111827",
  },

  subtitle:{
    marginTop:5,
    color:"#64748B",
  },

  requestCard:{
    backgroundColor:"#fff",
    marginHorizontal:20,
    marginBottom:15,
    padding:18,
    borderRadius:18,
    elevation:3,
  },

  label:{
    color:"#64748B",
    marginBottom:5,
  },

  requestId:{
    fontSize:18,
    fontWeight:"700",
    color:"#111827",
  },

  etaCard:{
    backgroundColor:"#DC2626",
    marginHorizontal:20,
    marginBottom:18,
    borderRadius:18,
    padding:22,
    alignItems:"center",
  },

  etaLabel:{
    color:"#fff",
    fontSize:15,
  },

  eta:{
    color:"#fff",
    fontSize:30,
    fontWeight:"700",
    marginTop:8,
  },

  hospitalCard:{
    backgroundColor:"#fff",
    marginHorizontal:20,
    marginBottom:18,
    padding:18,
    borderRadius:18,
    elevation:3,
  },

  hospitalHeading:{
    fontSize:17,
    fontWeight:"700",
    marginBottom:12,
    color:"#111827",
  },

  hospitalName:{
    fontSize:18,
    fontWeight:"700",
    color:"#2563EB",
    marginBottom:8,
  },

  info:{
    color:"#475569",
    marginBottom:5,
  },

  distance:{
    color:"#DC2626",
    marginTop:8,
    fontWeight:"700",
  },

  noticeCard:{
    backgroundColor:"#FEF3C7",
    marginHorizontal:20,
    marginBottom:20,
    padding:18,
    borderRadius:18,
  },

  noticeTitle:{
    fontWeight:"700",
    color:"#92400E",
    marginBottom:8,
  },

  noticeText:{
    color:"#92400E",
    lineHeight:22,
  },

});