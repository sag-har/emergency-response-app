import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import StatusCard from "../components/StatusCard";
import Timeline from "../components/Timeline";
import LocationCard from "../components/LocationCard";

export default function TrackingScreen({ route, navigation }) {
  const requestId =
    route?.params?.requestId || "REQ-0001";

  const selectedHospital =
    route?.params?.selectedHospital || null;

  const [status, setStatus] = useState("Pending");
  const [eta, setEta] = useState("12 mins");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStatus("Accepted");
      setEta("9 mins");
    }, 4000);

    const timer2 = setTimeout(() => {
      setStatus("Ambulance Dispatched");
      setEta("6 mins");
    }, 8000);

    const timer3 = setTimeout(() => {
      setStatus("Arriving");
      setEta("2 mins");
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 35 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.title}>
            Emergency Tracking
          </Text>

          <Text style={styles.subtitle}>
            Your emergency request is currently being processed.
          </Text>
        </View>

        {/* Request ID */}

        <View style={styles.card}>
          <Text style={styles.label}>
            Request ID
          </Text>

          <Text style={styles.requestId}>
            {requestId}
          </Text>
        </View>

        {/* Status */}

        <StatusCard status={status} />

        {/* ETA */}

        <View style={styles.etaCard}>
          <Text style={styles.etaTitle}>
            Estimated Arrival
          </Text>

          <Text style={styles.eta}>
            🚑 {eta}
          </Text>
        </View>

        {/* Location */}

        <LocationCard />

        {/* Timeline */}

        <Timeline status={status} />

        {/* Selected Hospital */}

        {selectedHospital && (
          <View style={styles.hospitalCard}>
            <Text style={styles.hospitalTitle}>
              Selected Hospital
            </Text>

            <Text style={styles.hospitalName}>
              {selectedHospital.name}
            </Text>

            <Text style={styles.hospitalText}>
              📍 {selectedHospital.address}
            </Text>

            <Text style={styles.hospitalText}>
              📞 {selectedHospital.phone}
            </Text>

            <Text style={styles.hospitalDistance}>
              Distance: {selectedHospital.distance}
            </Text>
          </View>
        )}

        {/* Notice */}

        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>
            Safety Notice
          </Text>

          <Text style={styles.noticeText}>
            Please keep your phone nearby. Emergency responders
            may contact you before arriving.
          </Text>
        </View>

        {/* Hospital */}

        <TouchableOpacity
          style={styles.redButton}
          onPress={() =>
            navigation.navigate("HospitalSelection")
          }
        >
          <Text style={styles.buttonText}>
            Choose Hospital
          </Text>
        </TouchableOpacity>

        {/* Home */}

        <TouchableOpacity
          style={styles.blueButton}
          onPress={() =>
            navigation.navigate("Home")
          }
        >
          <Text style={styles.buttonText}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 15,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 18,
    padding: 18,
    elevation: 3,
  },

  label: {
    color: "#64748B",
    marginBottom: 6,
    fontSize: 13,
  },

  requestId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
  },

  etaCard: {
    backgroundColor: "#D62828",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
    elevation: 5,
  },

  etaTitle: {
    color: "#fff",
    fontSize: 15,
  },

  eta: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 8,
  },

  hospitalCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 18,
    borderRadius: 18,
    elevation: 3,
  },

  hospitalTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 12,
  },

  hospitalName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2563EB",
    marginBottom: 8,
  },

  hospitalText: {
    color: "#475569",
    marginBottom: 4,
  },

  hospitalDistance: {
    marginTop: 8,
    color: "#D62828",
    fontWeight: "700",
  },

  noticeCard: {
    backgroundColor: "#FFF7ED",
    margin: 20,
    borderRadius: 18,
    padding: 18,
  },

  noticeTitle: {
    fontWeight: "bold",
    color: "#92400E",
    marginBottom: 6,
  },

  noticeText: {
    color: "#92400E",
    lineHeight: 22,
  },

  redButton: {
    backgroundColor: "#D62828",
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 12,
    elevation: 4,
  },

  blueButton: {
    backgroundColor: "#2563EB",
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    elevation: 4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
  },
});