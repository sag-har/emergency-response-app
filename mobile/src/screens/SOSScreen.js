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
        id: `REQ-${Date.now()}`,
        type: selectedType,
        notes,
        status: "Pending",
        time: new Date().toLocaleString(),
      };

      addHistory(emergencyData);

      setLoading(false);
      setNotes("");

      navigation.navigate("Confirmation", {
        requestId: emergencyData.id,
        status: emergencyData.status,
      });
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.header}>
          <Text style={styles.heading}>Emergency SOS</Text>
          <Text style={styles.subHeading}>
            Provide emergency details for faster assistance.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Emergency Type</Text>

          <View style={styles.typeBox}>
            <Text style={styles.typeText}>{selectedType}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Current Location</Text>

          <View style={styles.locationBox}>
            <Text style={styles.locationIcon}>📍</Text>

            <View>
              <Text style={styles.locationTitle}>
                Location Available
              </Text>

              <Text style={styles.locationText}>
                GPS integration coming in Phase 2
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Emergency Details</Text>

          <TextInput
            placeholder="Describe your emergency situation..."
            multiline
            value={notes}
            onChangeText={setNotes}
            style={styles.textArea}
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          disabled={loading}
          onPress={submitSOS}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
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
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
  },

  subHeading: {
    color: "#64748B",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 16,
    padding: 18,
    elevation: 3,
  },

  label: {
    fontWeight: "700",
    marginBottom: 12,
  },

  typeBox: {
    backgroundColor: "#FEE2E2",
    padding: 14,
    borderRadius: 12,
  },

  typeText: {
    color: "#D62828",
    fontWeight: "bold",
  },

  locationBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationIcon: {
    fontSize: 28,
    marginRight: 10,
  },

  locationTitle: {
    fontWeight: "bold",
  },

  locationText: {
    color: "#64748B",
  },

  textArea: {
    minHeight: 140,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 15,
    textAlignVertical: "top",
  },

  submitButton: {
    backgroundColor: "#D62828",
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});