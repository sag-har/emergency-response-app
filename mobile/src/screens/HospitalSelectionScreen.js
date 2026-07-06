import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";

import HospitalCard from "../components/HospitalCard";
import { hospitals } from "../data/hospitals";

export default function HospitalSelectionScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [hospitalList, setHospitalList] = useState([]);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = () => {
    setLoading(true);

    // Temporary Mock API
    setTimeout(() => {
      setHospitalList(hospitals);
      setLoading(false);
    }, 1200);
  };

  const openHospital = (hospital) => {
    navigation.navigate("HospitalDetail", {
      hospital,
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#D62828" />

        <Text style={styles.loadingText}>
          Fetching nearby hospitals...
        </Text>
      </SafeAreaView>
    );
  }

  if (hospitalList.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.emptyIcon}>🏥</Text>

        <Text style={styles.emptyTitle}>
          No Hospitals Found
        </Text>

        <Text style={styles.emptySubtitle}>
          There are currently no hospitals available near your location.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.title}>
          Nearby Hospitals
        </Text>

        <Text style={styles.subtitle}>
          Select the nearest hospital for emergency assistance.
        </Text>
      </View>

      {/* Hospital List */}

      <FlatList
        data={hospitalList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <HospitalCard
            hospital={item}
            onPress={openHospital}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
  },

  list: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#F8FAFC",
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#475569",
    fontWeight: "600",
  },

  emptyIcon: {
    fontSize: 70,
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 10,
  },

  emptySubtitle: {
    textAlign: "center",
    color: "#64748B",
    lineHeight: 24,
    fontSize: 15,
  },
});