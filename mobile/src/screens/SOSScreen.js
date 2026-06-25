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
import API from "../services/api";

export default function SOSScreen({ route, navigation }) {
  const { addHistory } = useContext(AppContext);

  const [selectedType, setSelectedType] = useState(
    route?.params?.type || "Medical"
  );

  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const emergencyTypes = [
    "Medical",
    "Fire",
    "Crime",
    "Accident",
    "General",
  ];

  const submitSOS = async () => {
    if (!notes.trim()) {
      Alert.alert(
        "Missing Information",
        "Please provide emergency details before submitting."
      );
      return;
    }

    try {
      setLoading(true);

      const payload = {
        emergencyType: selectedType,
        notes,
        location: {
          lat: 0,
          lng: 0,
        },
      };

      const response = await API.post(
        "/emergency",
        payload
      );

      const requestData = response.data;

      const emergencyData = {
        id:
          requestData?.id ||
          `REQ-${Date.now()}`,
        type: selectedType,
        notes,
        status:
          requestData?.status ||
          "Pending",
        time: new Date().toLocaleString(),
      };

      addHistory(emergencyData);

      setNotes("");

      navigation.navigate("Confirmation", {
        requestId:
          requestData?.id ||
          emergencyData.id,
        status:
          requestData?.status ||
          "Pending",
      });
    } catch (error) {
      Alert.alert(
        "Submission Failed",
        error?.response?.data?.message ||
          "Unable to submit emergency request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.header}>
          <Text style={styles.heading}>
            Emergency SOS
          </Text>

          <Text style={styles.subHeading}>
            Provide emergency details for faster assistance.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Emergency Type
          </Text>

          <View style={styles.typeContainer}>
            {emergencyTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  selectedType === type &&
                    styles.selectedTypeButton,
                ]}
                onPress={() =>
                  setSelectedType(type)
                }
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    selectedType === type &&
                      styles.selectedTypeButtonText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

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
                GPS integration coming in Phase 2
              </Text>
            </View>
          </View>
        </View>

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

        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>
            ⚠ Emergency Notice
          </Text>

          <Text style={styles.noticeText}>
            Submit requests only for real emergencies.
            False alerts may delay assistance for people in need.
          </Text>
        </View>

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

  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  typeButton: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
  },

  selectedTypeButton: {
    backgroundColor: "#D62828",
  },

  typeButtonText: {
    color: "#334155",
    fontWeight: "600",
  },

  selectedTypeButtonText: {
    color: "#FFFFFF",
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
    justifyContent: "center",
  },

  submitText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 8,
  },
});