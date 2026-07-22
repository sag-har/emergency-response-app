import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import API from "../services/api"; // adjust path if different

export default function EmergencyContactsScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadContacts = async () => {
    try {
      setLoading(true);

      const response = await API.get("/emergency/contacts");

      console.log("Emergency Contacts Response:", response.data);

      if (response.data.success) {
        setContacts(response.data.data);
      }
    } catch (err) {
      console.log("Load Contacts Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadContacts();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.contactCard}>
      <Text style={styles.name}>{item.name}</Text>

      <Text>{item.phone_number}</Text>

      <Text>{item.relation}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddContact")}
      >
        <Text style={styles.buttonText}>Add Contact</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#D62828" />
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 30 }}>
              No Emergency Contacts
            </Text>
          }
        />
      )}
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
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#D62828",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },

  contactCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },

  name: {
    fontWeight: "700",
    fontSize: 18,
  },
});