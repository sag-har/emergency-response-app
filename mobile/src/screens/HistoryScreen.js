<<<<<<< Updated upstream
import React, { useContext } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> Stashed changes
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";

<<<<<<< Updated upstream
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
=======
import emergencyService from "../services/emergencyService";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setRefreshing(true);

      const response = await emergencyService.getEmergencyHistory();

      if (response.success) {
        setHistory(response.data || []);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.log(error);
      setHistory([]);
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
            {getIcon(item.emergency_type)}
          </Text>

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              {item.emergency_type} Emergency
            </Text>

            <Text style={styles.time}>
              {new Date(item.created_at).toLocaleString()}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: getStatusColor(item.status),
            },
          ]}
        >
          <Text style={styles.statusText}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.notesLabel}>
        Description
      </Text>

      <Text style={styles.notes}>
        {item.notes || "No description provided"}
>>>>>>> Stashed changes
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.heading}>
<<<<<<< Updated upstream
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
=======
        Emergency History
      </Text>

      <Text style={styles.subHeading}>
        Your previous emergency requests
      </Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadHistory}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🚨</Text>

            <Text style={styles.emptyTitle}>
              No Emergency Requests Found
            </Text>

            <Text style={styles.emptyText}>
              Submit an emergency request to see it here.
            </Text>
          </View>
        }
      />

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
=======
    color: "#0F172A",
  },

  subHeading: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 4,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
>>>>>>> Stashed changes
    marginBottom: 15,
    elevation: 3,
  },

  id: {
    fontWeight: "bold",
    color: "#D62828",
    marginBottom: 5,
  },

<<<<<<< Updated upstream
  type: {
    fontSize: 18,
    fontWeight: "bold",
  },

  notes: {
    color: "#64748B",
    marginTop: 5,
=======
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
    marginTop: 4,
    color: "#64748B",
    fontSize: 13,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 25,
  },

  statusText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 15,
  },

  notesLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 6,
  },

  notes: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 22,
>>>>>>> Stashed changes
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
    marginTop: 100,
  },

  emptyText: {
    color: "#64748B",
<<<<<<< Updated upstream
    fontSize: 16,
=======
    paddingHorizontal: 20,
    lineHeight: 22,
>>>>>>> Stashed changes
  },
});