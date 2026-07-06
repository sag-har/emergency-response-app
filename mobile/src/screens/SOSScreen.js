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
      "Please enter emergency details."
    );
    return;
  }

  setLoading(true);

  setTimeout(() => {
    const requestId = `REQ-${Date.now()}`;

<<<<<<< HEAD
    const emergencyData = {
      id: requestId,
      type: selectedType,
      notes,
      status: "Pending",
      time: new Date().toLocaleString(),
    };
=======
      // 🔥 Content Cleaned: Duplication and git conflict markers removed completely
      const emergencyData = {
        id: requestId,
        type: selectedType,
        notes,
        status: "Pending",
        time: new Date().toLocaleString(),
      };
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f

    addHistory(emergencyData);

    setLoading(false);

<<<<<<< HEAD
    setNotes("");

    navigation.navigate("Confirmation", {
  requestId,
  status: "Pending",
});
  }, 1200);
};
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
      
      navigation.navigate("Confirmation", {
        requestId,
        status: "Pending",
      });
    }, 1200);
  };
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>Emergency SOS</Text>
          <Text style={styles.subHeading}>
            Provide emergency details for faster assistance.
          </Text>
        </View>

        {/* Emergency Type */}
        <View style={styles.card}>
          <Text style={styles.label}>Emergency Type</Text>
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
          <View style={styles.typeBox}>
            <Text style={styles.typeText}>{selectedType}</Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.card}>
          <Text style={styles.label}>Current Location</Text>

          <View style={styles.locationBox}>
            <Text style={styles.locationIcon}>📍</Text>

            <View>
              <Text style={styles.locationTitle}>Location Available</Text>
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
              <Text style={styles.locationText}>
                GPS integration will be connected in Up Coming Phase.
              </Text>
            </View>
          </View>
        </View>

        {/* Emergency Details */}
        <View style={styles.card}>
          <Text style={styles.label}>Emergency Details</Text>
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
          <TextInput
            placeholder="Describe your emergency situation"
            placeholderTextColor="#94A3B8"
            multiline
            value={notes}
            onChangeText={setNotes}
            style={styles.textArea}
          />
        </View>

        {/* Notice */}
        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>⚠ Emergency Notice</Text>

          <Text style={styles.noticeText}>
            Submit requests only for real emergencies. False alerts may delay
            assistance for people in need.
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, loading && { opacity: 0.7 }]}
          disabled={loading}
          onPress={submitSOS}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#FFFFFF" />
              <Text style={styles.submitText}>Submitting...</Text>
            </View>
          ) : (
            <Text style={styles.submitText}>Submit SOS Alert</Text>
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
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0F172A",
  },
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
  subHeading: {
    color: "#64748B",
    marginTop: 6,
    fontSize: 15,
  },
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
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
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
  typeBox: {
    backgroundColor: "#FEE2E2",
    padding: 14,
    borderRadius: 12,
  },
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
  typeText: {
    color: "#D62828",
    fontSize: 16,
    fontWeight: "700",
  },
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
  },
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
  locationIcon: {
    fontSize: 28,
    marginRight: 12,
  },
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
  locationTitle: {
    fontWeight: "700",
    color: "#0F172A",
  },
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
  locationText: {
    color: "#64748B",
    marginTop: 3,
  },
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
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
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
  noticeCard: {
    backgroundColor: "#FEF3C7",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
  },
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
  noticeTitle: {
    color: "#92400E",
    fontWeight: "700",
    marginBottom: 6,
  },
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
  noticeText: {
    color: "#92400E",
    lineHeight: 20,
  },
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
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
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
<<<<<<< HEAD

=======
>>>>>>> 39eecbbb5d453e3b8cf551a4ac634816ec6d543f
  submitText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 8,
  },
});