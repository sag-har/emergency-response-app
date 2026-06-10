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
} from "react-native";

import { AppContext } from "../context/AppContext";

export default function SOSScreen({ route, navigation }) {
  const { addHistory } = useContext(AppContext);

  const selectedType = route?.params?.type || "General";

  const [notes, setNotes] = useState("");

  const submitSOS = () => {
    const emergencyData = {
      type: selectedType,
      notes: notes || "No additional details",
      status: "Pending",
      time: new Date().toLocaleString(),
    };

    addHistory(emergencyData);

    Alert.alert(
      "SOS Submitted",
      "Emergency request has been recorded successfully.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("History"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.heading}>
            Emergency SOS
          </Text>

          <Text style={styles.subHeading}>
            Provide details so responders can help faster.
          </Text>
        </View>

        {/* EMERGENCY TYPE */}
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

        {/* LOCATION CARD */}
        <View style={styles.card}>
          <Text style={styles.label}>
            Current Location
          </Text>

          <View style={styles.locationBox}>
            <Text style={styles.locationIcon}>
              📍
            </Text>

            <View>
              <Text style={styles.locationTitle}>
                Location Available
              </Text>

              <Text style={styles.locationText}>
                GPS integration coming soon
              </Text>
            </View>
          </View>
        </View>

        {/* NOTES */}
        <View style={styles.card}>
          <Text style={styles.label}>
            Additional Information
          </Text>

          <TextInput
            placeholder="Describe your emergency situation..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={6}
            value={notes}
            onChangeText={setNotes}
            style={styles.textArea}
          />
        </View>

        {/* PRIORITY INFO */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            ⚠ Emergency Notice
          </Text>

          <Text style={styles.infoText}>
            Press submit only for real emergencies.
            False alerts may affect emergency response services.
          </Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitSOS}
        >
          <Text style={styles.submitText}>
            Submit SOS Alert
          </Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
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
    marginTop: 6,
    color: "#64748B",
    fontSize: 15,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 18,
    borderRadius: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

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
    borderRadius: 14,
  },

  typeText: {
    color: "#D62828",
    fontWeight: "700",
    fontSize: 16,
  },

  locationBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationIcon: {
    fontSize: 26,
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
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 15,
    textAlignVertical: "top",
    minHeight: 130,
    color: "#0F172A",
  },

  infoCard: {
    backgroundColor: "#FEF3C7",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },

  infoTitle: {
    fontWeight: "700",
    color: "#92400E",
    marginBottom: 6,
  },

  infoText: {
    color: "#92400E",
    lineHeight: 20,
  },

  submitButton: {
    backgroundColor: "#D62828",
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 18,
    alignItems: "center",

    shadowColor: "#D62828",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,

    elevation: 6,
  },

  submitText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
  },
});