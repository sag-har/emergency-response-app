import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { AppContext } from "../context/AppContext";

export default function HistoryScreen() {
  const { history } = useContext(AppContext);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.id}>
        {item.id}
      </Text>

      <Text style={styles.type}>
        {item.type}
      </Text>

      <Text style={styles.notes}>
        {item.notes}
      </Text>

      <Text style={styles.status}>
        Status: {item.status}
      </Text>

      <Text style={styles.time}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>
        Request History
      </Text>

      {history.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            No emergency requests yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
  },

  id: {
    fontWeight: "bold",
    color: "#D62828",
    marginBottom: 5,
  },

  type: {
    fontSize: 18,
    fontWeight: "bold",
  },

  notes: {
    color: "#64748B",
    marginTop: 5,
  },

  status: {
    marginTop: 10,
    color: "#16A34A",
    fontWeight: "bold",
  },

  time: {
    marginTop: 8,
    color: "#94A3B8",
    fontSize: 12,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "#64748B",
    fontSize: 16,
  },
});