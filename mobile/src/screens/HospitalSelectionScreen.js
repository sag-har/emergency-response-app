import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
 Text,
 StyleSheet,
 FlatList,
 RefreshControl,
} from "react-native";

import HospitalCard from "../components/HospitalCard";
import hospitalService from "../services/hospitalService";

import {
  LoadingSpinner,
  EmptyState,
  PrimaryButton,
} from "../components";

export default function HospitalSelectionScreen({
  navigation,
  route,
}) {

  const emergencyId =
    route?.params?.emergencyId || null;

  const latitude = 33.6844;
  const longitude = 73.0479;

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [hospitals, setHospitals] =
    useState([]);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await hospitalService.getNearbyHospitals(
          latitude,
          longitude
        );

      setHospitals(
        response?.hospitals ||
        response?.data?.hospitals ||
        []
      );

    } catch (err) {

      setError(
        err.message ||
        "Unable to load nearby hospitals."
      );

    } finally {

      setLoading(false);
      setRefreshing(false);

    }

  };

  const onRefresh = () => {

    setRefreshing(true);

    loadHospitals();

  };

  const openHospital = (hospital) => {

    navigation.navigate(
      "HospitalDetail",
      {
        hospital,
        emergencyId,
      }
    );

  };

    if (loading) {
    return (
      <LoadingSpinner
        message="Searching nearby hospitals..."
      />
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>

        <Text style={styles.errorIcon}>
          ⚠
        </Text>

        <Text style={styles.errorTitle}>
          Something went wrong
        </Text>

        <Text style={styles.errorText}>
          {error}
        </Text>

        <PrimaryButton
          title="Try Again"
          onPress={loadHospitals}
          style={{ marginTop: 25 }}
        />

      </SafeAreaView>
    );
  }

  if (hospitals.length === 0) {
    return (
      <EmptyState
        icon="🏥"
        title="No Nearby Hospitals"
        subtitle="There are currently no hospitals available nearby."
        actionLabel="Refresh"
        onAction={loadHospitals}
      />
    );
  }

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.title}>
          Nearby Hospitals
        </Text>

        <Text style={styles.subtitle}>
          Select a hospital for emergency
          treatment.
        </Text>

      </View>

      <FlatList
        data={hospitals}
        keyExtractor={(item) =>
          item.id?.toString()
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <HospitalCard
            hospital={item}
            onPress={() =>
              openHospital(item)
            }
          />
        )}
      />

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#F8FAFC",
  },

  header:{
    paddingHorizontal:20,
    paddingTop:20,
    paddingBottom:15,
  },

  title:{
    fontSize:28,
    fontWeight:"700",
    color:"#111827",
  },

  subtitle:{
    marginTop:6,
    color:"#64748B",
    lineHeight:22,
  },

  list:{
    paddingHorizontal:18,
    paddingBottom:30,
  },

  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:30,
    backgroundColor:"#F8FAFC",
  },

  errorIcon:{
    fontSize:65,
  },

  errorTitle:{
    marginTop:15,
    fontSize:24,
    fontWeight:"700",
    color:"#DC2626",
  },

  errorText:{
    marginTop:10,
    color:"#64748B",
    textAlign:"center",
    lineHeight:22,
  },

});