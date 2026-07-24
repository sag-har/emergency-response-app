import React from "react";
import {
  View,
  Text,
 TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function ContactCard({
  contact,
  onDelete,
}) {
  return (
    <View style={styles.card}>

      <View style={styles.left}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {contact.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View>
          <Text style={styles.name}>
            {contact.name}
          </Text>

          <Text style={styles.phone}>
            {contact.phone_number}
          </Text>

          <Text style={styles.relation}>
            {contact.relation}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => onDelete(contact.id)}>
        <Ionicons
          name="trash"
          color="#DC2626"
          size={24}
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#D62828",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  avatarText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  name: {
    fontWeight: "700",
    fontSize: 17,
  },

  phone: {
    color: "#64748B",
    marginTop: 4,
  },

  relation: {
    color: "#2563EB",
    marginTop: 2,
    fontWeight: "600",
  },
});