import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import emergencyService from "../services/emergencyService";

export default function TrackingScreen({ navigation, route }) {
  const currentEmergencyId =
    route?.params?.emergencyId ||
    route?.params?.requestId ||
    "N/A";

  const hospital =
    route?.params?.selectedHospital || null;

  const backupEmergency =
    route?.params?.emergency || null;

  const [status, setStatus] = useState(
    backupEmergency?.status || "Pending"
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmergency();

    if (
      hospital &&
      hospital.id &&
      currentEmergencyId !== "N/A"
    ) {
      assignHospital();
    }
  }, []);

  const loadEmergency = async () => {
    if (currentEmergencyId === "N/A") return;

    try {
      setLoading(true);

      const response =
        await emergencyService.getEmergencyById(
          currentEmergencyId
        );

      const data = response?.data || response;

      if (data?.status) {
        setStatus(data.status);
      }
    } catch {
      if (backupEmergency?.status) {
        setStatus(backupEmergency.status);
      }
    } finally {
      setLoading(false);
    }
  };

  const assignHospital = async () => {
    try {
      await emergencyService.assignHospitalToEmergency(
        currentEmergencyId,
        hospital.id
      );

      loadEmergency();
    } catch {}
  };

  const getStatusColor = () => {
    switch (status) {
      case "Pending":
        return "#F59E0B";

      case "Accepted":
      case "Dispatched":
        return "#2563EB";

      case "Completed":
      case "Resolved":
        return "#16A34A";

      default:
        return "#64748B";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.heading}>
            Emergency Tracking
          </Text>

          <Text style={styles.subHeading}>
            Monitor your emergency request in real time.
          </Text>
        </View>

        {/* Status Card */}

        <View style={styles.statusCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.smallTitle}>
              Current Status
            </Text>

            <Text
              style={[
                styles.status,
                {
                  color: getStatusColor(),
                },
              ]}
            >
              {status}
            </Text>
          </View>

          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  getStatusColor(),
              },
            ]}
          />
        </View>

        {/* Request Information */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Request Details
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Request ID
            </Text>

            <Text style={styles.value}>
              {currentEmergencyId}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Emergency
            </Text>

            <Text style={styles.value}>
              {backupEmergency?.emergency_type ||
                backupEmergency?.type ||
                "Emergency"}
            </Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.label}>
              Description
            </Text>

            <Text style={styles.description}>
              {backupEmergency?.notes ||
                "No description provided."}
            </Text>
          </View>
        </View>
        {/* Hospital Card */}

        {hospital && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Assigned Hospital
            </Text>

            <Text style={styles.hospitalName}>
              {hospital.name}
            </Text>

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

              <Text style={styles.value}>
                {hospital.distance_km ||
                  hospital.distance ||
                  "N/A"}{" "}
                km
              </Text>
            </View>
          </View>
        )}

        {/* Safety Tips */}

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>
            Safety Tips
          </Text>

          <Text style={styles.tipText}>
            • Stay calm while waiting for emergency responders.
            {"\n\n"}
            • Keep your phone nearby and answer incoming calls.
            {"\n\n"}
            • If your condition worsens, contact emergency services immediately.
          </Text>
        </View>

        {/* Action Buttons */}

        <View style={styles.buttonRow}>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.refreshButton,
            ]}
            onPress={loadEmergency}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>
                Refresh
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.hospitalButton,
            ]}
            onPress={() =>
              navigation.navigate(
                "HospitalSelection",
                {
                  emergencyId:
                    currentEmergencyId,
                }
              )
            }
          >
            <Text style={styles.buttonText}>
              Hospitals
            </Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={styles.homeButton}
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
    backgroundColor: "#EEF3F9",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  /* ---------------- Header ---------------- */

  header: {
    marginBottom: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },

  subHeading: {
    marginTop: 6,
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
  },

  /* ---------------- Status Card ---------------- */

  statusCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    padding: 20,
    borderRadius: 20,

    marginBottom: 18,

    elevation: 5,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  smallTitle: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  status: {
    fontSize: 25,
    fontWeight: "800",
    marginTop: 5,
  },

  statusDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },

  /* ---------------- Information Card ---------------- */

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 20,

    marginBottom: 18,

    elevation: 5,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#0F172A",

    marginBottom: 18,
  },

  infoRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingVertical: 8,

    borderBottomWidth: 1,

    borderBottomColor: "#F1F5F9",
  },

  infoColumn: {
    marginTop: 15,
  },

  label: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },

  value: {
    flex: 1,

    textAlign: "right",

    marginLeft: 20,

    color: "#0F172A",

    fontSize: 15,

    fontWeight: "700",
  },

  description: {
    marginTop: 8,

    color: "#475569",

    lineHeight: 24,

    fontSize: 15,
  },

  /* ---------------- Hospital ---------------- */

  hospitalName: {
    fontSize: 19,

    fontWeight: "700",

    color: "#2563EB",

    marginBottom: 12,
  },

  /* ---------------- Safety Tips ---------------- */

  tipCard: {
    backgroundColor: "#FFF8DB",

    borderLeftWidth: 5,

    borderLeftColor: "#FBBF24",

    borderRadius: 18,

    padding: 18,

    marginBottom: 24,
  },

  tipTitle: {
    fontSize: 18,

    fontWeight: "700",

    color: "#92400E",

    marginBottom: 10,
  },

  tipText: {
    color: "#92400E",

    fontSize: 15,

    lineHeight: 24,
  },

  /* ---------------- Buttons ---------------- */

  buttonRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 15,
  },

  actionButton: {
    flex: 0.48,

    height: 55,

    borderRadius: 15,

    justifyContent: "center",

    alignItems: "center",

    elevation: 5,

    shadowColor: "#000",

    shadowOpacity: 0.12,

    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  refreshButton: {
    backgroundColor: "#2563EB",
  },

  hospitalButton: {
    backgroundColor: "#DC2626",
  },

  homeButton: {
    height: 58,

    borderRadius: 16,

    backgroundColor: "#16A34A",

    justifyContent: "center",

    alignItems: "center",

    elevation: 5,

    shadowColor: "#000",

    shadowOpacity: 0.12,

    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "700",
  },
});