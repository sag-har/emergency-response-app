import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";

import AvailabilityBadge from "../components/AvailabilityBadge";

export default function HospitalDetailScreen({ route, navigation }) {
  const { hospital } = route.params;

  const [loading, setLoading] = useState(false);

  const handleSelectHospital = () => {
    setLoading(true);

    // Mock API Call
    setTimeout(() => {
      setLoading(false);

      Alert.alert(
        "Hospital Selected",
        `${hospital.name} has been linked with your emergency request.`,
        [
          {
            text: "Continue",
            onPress: () =>
              navigation.navigate("Tracking", {
                selectedHospital: hospital,
              }),
          },
        ]
      );
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        {/* Hospital Card */}

        <View style={styles.card}>
          <Text style={styles.icon}>🏥</Text>

          <Text style={styles.title}>
            {hospital.name}
          </Text>

          <AvailabilityBadge
            available={hospital.isAvailable}
          />

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Address
            </Text>

            <Text style={styles.value}>
              {hospital.address}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Phone
            </Text>

            <Text style={styles.value}>
              {hospital.phone}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Distance
            </Text>

            <Text style={styles.distance}>
              {hospital.distance}
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>
            This hospital is available to receive emergency
            patients. Selecting this hospital will associate
            it with your emergency request so responders know
            where to transport you.
          </Text>

          <TouchableOpacity
            style={[
              styles.selectButton,
              loading && { opacity: 0.7 },
            ]}
            disabled={loading}
            onPress={handleSelectHospital}
          >
            {loading ? (
              <View style={styles.loading}>
                <ActivityIndicator
                  size="small"
                  color="#FFFFFF"
                />

                <Text style={styles.buttonText}>
                  Selecting...
                </Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>
                Select Hospital
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>
              Back
            </Text>
          </TouchableOpacity>
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

  card: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 22,
    padding: 22,
    elevation: 5,
  },

  icon: {
    fontSize: 70,
    textAlign: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0F172A",
    marginBottom: 15,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 20,
  },

  infoRow: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "600",
  },

  distance: {
    fontSize: 18,
    color: "#D62828",
    fontWeight: "bold",
  },

  description: {
    color: "#64748B",
    lineHeight: 24,
    fontSize: 15,
    marginBottom: 30,
  },

  selectButton: {
    backgroundColor: "#D62828",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    elevation: 5,
  },

  loading: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 8,
  },

  backButton: {
    marginTop: 18,
    alignItems: "center",
  },

  backText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 16,
  },
});