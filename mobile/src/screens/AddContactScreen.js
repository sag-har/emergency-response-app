import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import API from "../services/api";

import Header from "../components/Header";
import TextInputField from "../components/TextInputField";
import PrimaryButton from "../components/PrimaryButton";
import ErrorMessage from "../components/ErrorMessage";

export default function AddContactScreen({
  navigation,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!name.trim()) {
      setError("Please enter contact name.");
      return false;
    }

    if (name.length < 3) {
      setError("Name is too short.");
      return false;
    }

    if (!phone.trim()) {
      setError("Please enter phone number.");
      return false;
    }

    if (!/^[0-9]{11}$/.test(phone)) {
      setError("Phone number must contain exactly 11 digits.");
      return false;
    }

    if (!relation.trim()) {
      setError("Please enter relationship.");
      return false;
    }

    setError("");
    return true;
  };

  const saveContact = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const response = await API.post(
        "/emergency/contacts",
        {
          name,
          phone_number: phone,
          relation,
        }
      );

      if (response.data.success) {
        Alert.alert(
          "Success",
          "Emergency contact added successfully.",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }
    } catch (err) {
      Alert.alert(
        "Error",
        err.response?.data?.message ||
          "Unable to save contact."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <Header
        title="Add Contact"
        navigation={navigation}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.card}>

          <Text style={styles.heading}>
            Emergency Contact Information
          </Text>

          <Text style={styles.subtitle}>
            Add someone who should be contacted
            immediately during an emergency.
          </Text>

          <ErrorMessage message={error} />

          <Text style={styles.label}>
            Full Name
          </Text>

          <TextInputField
            placeholder="Ali Ahmed"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>
            Phone Number
          </Text>

          <TextInputField
            placeholder="03XXXXXXXXX"
            value={phone}
            keyboardType="phone-pad"
            onChangeText={setPhone}
            maxLength={11}
          />

          <Text style={styles.label}>
            Relationship
          </Text>

          <TextInputField
            placeholder="Father / Mother / Brother"
            value={relation}
            onChangeText={setRelation}
          />

          <PrimaryButton
            title="Save Contact"
            loading={loading}
            onPress={saveContact}
          />

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

  content: {
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,
    elevation: 5,
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 25,
    color: "#64748B",
    lineHeight: 22,
  },

  label: {
    marginBottom: 8,
    marginTop: 12,
    fontWeight: "700",
    color: "#334155",
  },

});