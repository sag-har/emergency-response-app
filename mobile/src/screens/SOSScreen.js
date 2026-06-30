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
      const requestId = `REQ-${Date.now()}`;

<<<<<<< HEAD
=======
      // 🔥 Content Cleaned: Duplication and git conflict markers removed completely
>>>>>>> feature/backend-core
      const emergencyData = {
        id: requestId,
        type: selectedType,
        notes,
        status: "Pending",
        time: new Date().toLocaleString(),
      };

      addHistory(emergencyData);

      setLoading(false);
      setNotes("");

<<<<<<< HEAD
=======
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
      
>>>>>>> feature/backend-core
      navigation.navigate("Confirmation", {
        requestId,
        status: "Pending",
      });
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
<<<<<<< HEAD
          <Text style={styles.heading}>
            Emergency SOS
          </Text>

=======
          <Text style={styles.heading}>Emergency SOS</Text>
>>>>>>> feature/backend-core
          <Text style={styles.subHeading}>
            Provide emergency details for faster assistance.
          </Text>
        </View>

        {/* TYPE */}
        <View style={styles.card}>
<<<<<<< HEAD
          <Text style={styles.label}>
            Emergency Type
          </Text>

          <View style={styles.typeBox}>
            <Text style={styles.typeText}>
              {selectedType}
            </Text>
=======
          <Text style={styles.label}>Emergency Type</Text>
          <View style={styles.typeBox}>
            <Text style={styles.typeText}>{selectedType}</Text>
>>>>>>> feature/backend-core
          </View>
        </View>

        {/* LOCATION */}
        <View style={styles.card}>
<<<<<<< HEAD
          <Text style={styles.label}>
            Current Location
          </Text>

          <View style={styles.locationBox}>
            <Text style={styles.locationIcon}>📍</Text>

            <View>
              <Text style={styles.locationTitle}>
                Location Available
              </Text>

=======
          <Text style={styles.label}>Current Location</Text>
          <View style={styles.locationBox}>
            <Text style={styles.locationIcon}>📍</Text>
            <View>
              <Text style={styles.locationTitle}>Location Available</Text>
>>>>>>> feature/backend-core
              <Text style={styles.locationText}>
                GPS integration will be connected in Phase 2
              </Text>
            </View>
          </View>
        </View>

        {/* NOTES */}
        <View style={styles.card}>
<<<<<<< HEAD
          <Text style={styles.label}>
            Emergency Details
          </Text>

=======
          <Text style={styles.label}>Emergency Details</Text>
>>>>>>> feature/backend-core
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
<<<<<<< HEAD
          <Text style={styles.noticeTitle}>
            ⚠ Emergency Notice
          </Text>

          <Text style={styles.noticeText}>
            Submit requests only for real emergencies. False
            alerts may delay assistance for people in need.
=======
          <Text style={styles.noticeTitle}>⚠ Emergency Notice</Text>
          <Text style={styles.noticeText}>
            Submit requests only for real emergencies. False alerts may delay
            assistance for people in need.
>>>>>>> feature/backend-core
          </Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
<<<<<<< HEAD
          style={[
            styles.submitButton,
            loading && { opacity: 0.7 },
          ]}
=======
          style={[styles.submitButton, loading && { opacity: 0.7 }]}
>>>>>>> feature/backend-core
          disabled={loading}
          onPress={submitSOS}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
<<<<<<< HEAD
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
=======
              <ActivityIndicator size="small" color="#FFFFFF" />
              <Text style={styles.submitText}>Submitting...</Text>
            </View>
          ) : (
            <Text style={styles.submitText}>Submit SOS Alert</Text>
>>>>>>> feature/backend-core
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
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0F172A",
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  subHeading: {
    color: "#64748B",
    marginTop: 6,
    fontSize: 15,
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 18,
    borderRadius: 18,
    elevation: 3,
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  typeBox: {
    backgroundColor: "#FEE2E2",
    padding: 14,
    borderRadius: 12,
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  typeText: {
    color: "#D62828",
    fontSize: 16,
    fontWeight: "700",
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  locationIcon: {
    fontSize: 28,
    marginRight: 12,
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  locationTitle: {
    fontWeight: "700",
    color: "#0F172A",
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  locationText: {
    color: "#64748B",
    marginTop: 3,
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  textArea: {
    minHeight: 140,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 15,
    textAlignVertical: "top",
    color: "#0F172A",
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  noticeCard: {
    backgroundColor: "#FEF3C7",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  noticeTitle: {
    color: "#92400E",
    fontWeight: "700",
    marginBottom: 6,
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  noticeText: {
    color: "#92400E",
    lineHeight: 20,
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  submitButton: {
    backgroundColor: "#D62828",
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    elevation: 6,
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
<<<<<<< HEAD

=======
>>>>>>> feature/backend-core
  submitText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 8,
  },
});