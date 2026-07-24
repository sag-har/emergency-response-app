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

import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import API from "../services/api";

export default function EmergencyContactsScreen({ navigation }) {

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);

  const loadContacts = async () => {
    try {
      setLoading(true);

      const response = await API.get("/emergency/contacts");

      if (response.data.success) {
        setContacts(response.data.data);
      }

    } catch (err) {
      console.log(err.response?.data || err.message);
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

  const onRefresh = async () => {
  setRefreshing(true);
  await loadContacts();
  setRefreshing(false);
};

  const renderItem = ({ item }) => {
    const firstLetter = item.name
      ? item.name.charAt(0).toUpperCase()
      : "?";

    return (
      <View style={styles.contactCard}>

        {/* Avatar */}

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {firstLetter}
          </Text>
        </View>

        {/* Contact Details */}

        <View style={styles.contactInfo}>

          <Text style={styles.name}>
            {item.name}
          </Text>

          <View style={styles.infoRow}>
            <Ionicons
              name="call-outline"
              size={18}
              color="#2563EB"
            />

            <Text style={styles.infoText}>
              {item.phone_number}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons
              name="people-outline"
              size={18}
              color="#16A34A"
            />

            <Text style={styles.infoText}>
              {item.relation}
            </Text>
          </View>

        </View>

        {/* Arrow */}

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <View>
          <Text style={styles.title}>
            Emergency Contacts
          </Text>

          <Text style={styles.subtitle}>
            People who will be notified during emergencies.
          </Text>
        </View>

        <View style={styles.countBadge}>
  <Ionicons
    name="people"
    size={16}
    color="#D62828"
  />

  <Text style={styles.countText}>
    {contacts.length} Emergency Contact
    {contacts.length !== 1 ? "s" : ""}
  </Text>
</View>

        <View style={styles.headerIcon}>
          <Ionicons
            name="people"
            size={28}
            color="#FFFFFF"
          />
        </View>

      </View>

      {/* Add Contact Button */}

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate("AddContact")
        }
      >
        <Ionicons
          name="add-circle"
          size={24}
          color="#FFFFFF"
        />

        <Text style={styles.buttonText}>
          Add Emergency Contact
        </Text>
      </TouchableOpacity>

      {/* Contacts */}

      {loading ? (

        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="#D62828"
          />

          <Text style={styles.loadingText}>
            Loading contacts...
          </Text>
        </View>

      ) : (

        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshing={refreshing}
onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          ListEmptyComponent={
            <View style={styles.emptyCard}>

              <Ionicons
                name="people-circle-outline"
                size={80}
                color="#CBD5E1"
              />

              <Text style={styles.emptyTitle}>
                No Emergency Contacts
              </Text>

              <Text style={styles.emptySubtitle}>
                Add trusted family members or friends
                who can be contacted during an emergency.
              </Text>

            </View>
          }
        />

      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  /* ---------- Header ---------- */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
    width: "90%",
  },

  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "#D62828",
    justifyContent: "center",
    alignItems: "center",

    elevation: 5,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  /* ---------- Add Button ---------- */

  button: {
    height: 60,
    backgroundColor: "#D62828",
    borderRadius: 18,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 22,

    elevation: 5,

    shadowColor: "#D62828",
    shadowOpacity: 0.30,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 10,
  },

  /* ---------- Contact Card ---------- */

  contactCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,

    marginBottom: 16,

    flexDirection: "row",
    alignItems: "center",

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#D62828",

    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },

  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  infoText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#475569",
  },

  /* ---------- Loading ---------- */

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 15,
    color: "#64748B",
    fontSize: 15,
    fontWeight: "500",
  },

  /* ---------- Empty State ---------- */

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 50,
    paddingHorizontal: 25,
    alignItems: "center",
    marginTop: 35,

    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  emptySubtitle: {
    marginTop: 10,
    fontSize: 15,
    color: "#64748B",
    lineHeight: 24,
    textAlign: "center",
  },

countBadge: {
    marginTop:12,

    alignSelf:"flex-start",

    flexDirection:"row",

    alignItems:"center",

    backgroundColor:"#FEE2E2",

    paddingHorizontal:14,

    paddingVertical:8,

    borderRadius:30,
},

countText:{
    marginLeft:8,
    color:"#D62828",
    fontWeight:"700",
    fontSize:13,
},

});