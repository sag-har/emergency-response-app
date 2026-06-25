import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import API from "../services/api";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadHistory = async () => {
    try {
      setError("");

      // Replace userId with logged-in user later
      const response = await API.get("/emergency?userId=1");

      setHistory(response.data || []);
    } catch (err) {
      console.log(err);

      setError(
        "Unable to load emergency history. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadHistory();
  };

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
            {getIcon(item.emergencyType)}
          </Text>

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              {item.emergencyType}
            </Text>

            <Text style={styles.time}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.statusBadge,
            item.status === "Resolved" &&
              styles.resolvedBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.status === "Resolved" &&
                styles.resolvedText,
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.notesLabel}>
        Emergency Details
      </Text>

      <Text style={styles.notes}>
        {item.notes}
      </Text>

      <Text style={styles.requestId}>
        Request ID: {item.id}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#D62828"
        />

        <Text style={styles.loadingText}>
          Loading emergency history...
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorTitle}>
          Something went wrong
        </Text>

        <Text style={styles.errorText}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>
        Emergency History
      </Text>

      <Text style={styles.subHeading}>
        View all submitted emergency requests
      </Text>

      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>
            🚨
          </Text>

          <Text style={styles.emptyTitle}>
            No Emergency Requests Found
          </Text>

          <Text style={styles.emptyText}>
            Your emergency requests will appear here
            after submission.
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) =>
            item.id.toString()
          }
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={{
            paddingBottom: 30,
          }}
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

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  loadingText: {
    marginTop: 10,
    color: "#64748B",
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D62828",
    marginBottom: 10,
  },

  errorText: {
    textAlign: "center",
    color: "#64748B",
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
    elevation: 4,
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
    fontSize: 32,
    marginRight: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  time: {
    color: "#64748B",
    marginTop: 4,
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
    fontWeight: "700",
    fontSize: 12,
  },

  resolvedBadge: {
    backgroundColor: "#DCFCE7",
  },

  resolvedText: {
    color: "#166534",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 14,
  },

  notesLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 6,
  },

  notes: {
    color: "#334155",
    lineHeight: 22,
  },

  requestId: {
    marginTop: 10,
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
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
    marginTop: 15,
  },

  emptyText: {
    marginTop: 10,
    textAlign: "center",
    color: "#64748B",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
});