import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { AppContext } from "../context/AppContext";

export default function SOSScreen({ route, navigation }) {
  const { addHistory } = useContext(AppContext);

  const selectedType = route?.params?.type || "General";

  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const submitSOS = () => {
    if (!notes.trim()) {
      Alert.alert(
        "Missing Information",
        "Please provide emergency details before submitting."
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const emergencyData = {
        id: Date.now().toString(),
        type: selectedType,
        notes,
        status: "Pending",
        time: new Date().toLocaleString(),
      };

      addHistory(emergencyData);

      setLoading(false);
      setNotes("");

      Alert.alert(
        "SOS Submitted",
        "Your emergency request has been recorded successfully.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.heading}>
            Emergency SOS
          </Text>

          <Text style={styles.subHeading}>
            Provide emergency details for faster assistance.
          </Text>
        </View>

        {/* TYPE */}
        <View style={styles.card}>
          <Text style={styles.label}>
            Emergency Type
          </Text>

          <View style={styles.typeBox}>
            <Text style={styles.typeText}>
              {selectedType}
            </Text>
          </View>
        </View>

        {/* LOCATION */}
        <View style={styles.card}>
          <Text style={styles.label}>
            Current Location
          </Text>

          <View style={styles.locationBox}>
            <Text style={styles.locationIcon}>📍</Text>

            <View>
              <Text style={styles.locationTitle}>
                Location Available
              </Text>

              <Text style={styles.locationText}>
                GPS integration will be connected in Phase 2
              </Text>
            </View>
          </View>
        </View>

        {/* NOTES */}
        <View style={styles.card}>
          <Text style={styles.label}>
            Emergency Details
          </Text>

          <TextInput
            placeholder="Describe your emergency situation..."
            placeholderTextColor="#94A3B8"
            multiline
            value={notes}
            onChangeText={setNotes}
            style={styles.textArea}
          />
        </View>

        {/* NOTICE */}
        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>
            ⚠ Emergency Notice
          </Text>

          <Text style={styles.noticeText}>
            Submit requests only for real emergencies. False
            alerts may delay assistance for people in need.
          </Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            loading && { opacity: 0.7 },
          ]}
          disabled={loading}
          onPress={submitSOS}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="small"
                color="#FFFFFF"
              />

              <Text style={styles.submitText}>
                Submitting...
              </Text>
            </View>
          ) : (
            <Text style={styles.submitText}>
              Submit SOS Alert
            </Text>
          )}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0F172A",
  },

  subHeading: {
    color: "#64748B",
    marginTop: 6,
    fontSize: 15,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 18,
    borderRadius: 18,
    elevation: 3,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  typeBox: {
    backgroundColor: "#FEE2E2",
    padding: 14,
    borderRadius: 12,
  },

  typeText: {
    color: "#D62828",
    fontSize: 16,
    fontWeight: "700",
  },

  locationBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationIcon: {
    fontSize: 28,
    marginRight: 12,
  },

  locationTitle: {
    fontWeight: "700",
    color: "#0F172A",
  },

  locationText: {
    color: "#64748B",
    marginTop: 3,
  },

  textArea: {
    minHeight: 140,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 15,
    textAlignVertical: "top",
    color: "#0F172A",
  },

  noticeCard: {
    backgroundColor: "#FEF3C7",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
  },

  noticeTitle: {
    color: "#92400E",
    fontWeight: "700",
    marginBottom: 6,
  },

  noticeText: {
    color: "#92400E",
    lineHeight: 20,
  },

  submitButton: {
    backgroundColor: "#D62828",
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    elevation: 6,
  },

  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  submitText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 8,
  },
});