import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";

import { AppContext } from "../context/AppContext";
import emergencyService from "../services/emergencyService";
import { generateRequestId } from "../utils/helpers";

export default function SOSScreen({ navigation, route }) {
  const { addHistory } = useContext(AppContext);

  const emergencyType = route?.params?.type || "General";

  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const submitSOS = async () => {
    if (!notes.trim()) {
      Alert.alert(
        "Missing Details",
        "Please describe your emergency."
      );
      return;
    }

    try {
      setLoading(true);

      const requestId = generateRequestId();

      const emergency = {
        id: requestId,
        type: emergencyType,
       	status: "Pending",
        notes,
        createdAt: new Date().toISOString(),
      };

      // API Call
      try {
        await emergencyService.createEmergency(emergency);
      } catch (e) {
        console.log("Using local emergency history.");
      }

      addHistory(emergency);

      navigation.replace("Confirmation", {
        requestId,
        emergency,
      });
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to submit emergency request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>
          Emergency Request
        </Text>

        <Text style={styles.subtitle}>
          Fill in the information below.
        </Text>

        <View style={styles.card}>

          <Text style={styles.label}>
            Emergency Type
          </Text>

          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>
              {emergencyType}
            </Text>
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
                GPS Location
              </Text>

              <Text style={styles.locationSubtitle}>
                Live location integration available in backend.
              </Text>
            </View>
          </View>

        </View>

        <View style={styles.card}>

          <Text style={styles.label}>
            Emergency Details
          </Text>

          <TextInput
            multiline
            value={notes}
            onChangeText={setNotes}
            placeholder="Describe your emergency..."
            style={styles.input}
          />

        </View>

        <View style={styles.noticeBox}>

          <Text style={styles.noticeTitle}>
            Emergency Notice
          </Text>

          <Text style={styles.noticeText}>
            False emergency requests may delay help for someone who really needs assistance.
          </Text>

        </View>

        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={submitSOS}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              Submit Emergency
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
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginTop: 10,
  },

  subtitle: {
    color: "#64748B",
    marginBottom: 20,
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 18,
    elevation: 3,
  },

  label: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 12,
    color: "#111827",
  },

  typeBadge: {
    backgroundColor: "#FEE2E2",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
  },

  typeText: {
    color: "#DC2626",
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
    color: "#111827",
  },

  locationSubtitle: {
    color: "#64748B",
    marginTop: 3,
  },

  input: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    minHeight: 140,
    padding: 15,
    textAlignVertical: "top",
  },

  noticeBox: {
    backgroundColor: "#FEF3C7",
    padding: 18,
    borderRadius: 16,
    marginBottom: 25,
  },

  noticeTitle: {
    fontWeight: "700",
    color: "#92400E",
    marginBottom: 6,
  },

  noticeText: {
    color: "#92400E",
    lineHeight: 22,
  },

  button: {
    backgroundColor: "#DC2626",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

});