import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";

import { AppContext } from "../context/AppContext";
import { getEmergencyHistory } from "../services/emergencyService";

export default function HistoryScreen() {
  const { history: localHistory, user } = useContext(AppContext);

  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setRefreshing(true);

      const response = await getEmergencyHistory(user?.id);

      if (response.success) {
        setHistory(response.data);
      } else {
        setHistory(localHistory);
      }
    } catch (error) {
      console.log(error);
      setHistory(localHistory);
    } finally {
      setRefreshing(false);
    }
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#F59E0B";

      case "Accepted":
      case "Dispatched":
        return "#2563EB";

      case "On The Way":
        return "#7C3AED";

      case "Resolved":
      case "Completed":
        return "#16A34A";

      default:
        return "#64748B";
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          <Text style={styles.icon}>
            {getIcon(item.type || item.emergency_type)}
          </Text>

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              {(item.type || item.emergency_type) + " Emergency"}
            </Text>

            <Text style={styles.time}>
              {item.time ||
                item.created_at ||
                item.CreatedAt}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: getStatusColor(
                item.status || item.Status
              ),
            },
          ]}
        >
          <Text style={styles.statusText}>
            {item.status || item.Status}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.notesLabel}>
        Description
      </Text>

      <Text style={styles.notes}>
        {item.notes ||
          item.description ||
          item.Description ||
          "No description provided"}
      </Text>
    </View>
  );

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
            Your SOS requests will appear here after submission.
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) =>
            item.id?.toString() ||
            item.Id?.toString() ||
            index.toString()
          }
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={loadHistory}
            />
          }
          showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
  },

  statusText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
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