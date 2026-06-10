import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import { AppContext } from "../context/AppContext";

export default function HistoryScreen() {
  const { history } = useContext(AppContext);

  const getIcon = (type) => {
    switch (type) {
      case "Medical":
        return "🚑";
      case "Fire":
        return "🔥";
      case "Crime":
        return "🚔";
      case "Accident":
        return "🚗";
      default:
        return "🚨";
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          <Text style={styles.icon}>
            {getIcon(item.type)}
          </Text>

          <View>
            <Text style={styles.title}>
              {item.type} Emergency
            </Text>

            <Text style={styles.time}>
              {item.time}
            </Text>
          </View>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {item.status}
          </Text>
        </View>
      </View>

      <Text style={styles.notes}>
        {item.notes}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>
        Emergency History
      </Text>

      <Text style={styles.subHeading}>
        Track all emergency requests
      </Text>

      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>
            📭
          </Text>

          <Text style={styles.emptyTitle}>
            No Emergency Records
          </Text>

          <Text style={styles.emptyText}>
            Your submitted emergency requests
            will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(_, index) =>
            index.toString()
          }
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0F172A",
  },

  subHeading: {
    color: "#64748B",
    marginTop: 5,
    marginBottom: 25,
    fontSize: 15,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  icon: {
    fontSize: 30,
    marginRight: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  time: {
    color: "#64748B",
    marginTop: 3,
    fontSize: 13,
  },

  statusBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },

  statusText: {
    color: "#92400E",
    fontWeight: "600",
    fontSize: 12,
  },

  notes: {
    marginTop: 14,
    color: "#475569",
    lineHeight: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 70,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 20,
  },

  emptyText: {
    color: "#64748B",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
});