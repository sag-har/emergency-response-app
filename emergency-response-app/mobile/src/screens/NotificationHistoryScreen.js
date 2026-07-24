import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import API from "../services/api";

export default function NotificationHistoryScreen({
  navigation,
}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const response = await API.get("/notifications");

      if (response.data.success) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Unable to load notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  };

  const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "medical":
        return "medkit";

      case "fire":
        return "flame";

      case "police":
        return "shield-checkmark";

      case "warning":
        return "warning";

      case "accident":
        return "car-sport";

      default:
        return "notifications";
    }
  };

  const getColor = (type) => {
    switch (type?.toLowerCase()) {
      case "medical":
        return "#DC2626";

      case "fire":
        return "#EA580C";

      case "police":
        return "#2563EB";

      case "warning":
        return "#F59E0B";

      case "accident":
        return "#7C3AED";

      default:
        return "#16A34A";
    }
  };

  const formatDate = (date) => {
    if (!date) return "Today";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "--:--";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderNotification = ({ item }) => {
  const color = getColor(item.type);
  const icon = getIcon(item.type);

  const date = item.created_at
    ? new Date(item.created_at)
    : new Date();

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      style={styles.notificationCard}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: `${color}15`,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={24}
          color={color}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {item.title || "Emergency Update"}
          </Text>

          <Text style={styles.time}>
            {formattedTime}
          </Text>
        </View>

        <Text
          style={styles.message}
          numberOfLines={3}
        >
          {item.message || "No notification details available."}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.date}>
            {formattedDate}
          </Text>

          <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor: color,
              },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

if (loading) {
  return (
    <SafeAreaView style={styles.loadingContainer}>
      <ActivityIndicator
        size="large"
        color="#DC2626"
      />

      <Text style={styles.loadingText}>
        Loading notifications...
      </Text>
    </SafeAreaView>
  );
}

return (
  <SafeAreaView style={styles.container}>

    {/* Header */}

    <View style={styles.header}>

      <Text style={styles.heading}>
        Notification History
      </Text>

      <Text style={styles.subHeading}>
        View all emergency updates and important activities in one place.
      </Text>

      <View style={styles.countBadge}>
        <Text style={styles.countText}>
          {notifications.length} Notification
          {notifications.length !== 1 ? "s" : ""}
        </Text>
      </View>

    </View>

    {/* List */}

    {notifications.length === 0 ? (

      <View style={styles.emptyContainer}>

        <Ionicons
          name="mail-open-outline"
          size={72}
          color="#CBD5E1"
        />

        <Text style={styles.emptyTitle}>
          No Notifications
        </Text>

        <Text style={styles.emptySubtitle}>
          When emergency alerts or system updates are available,
          they'll appear here.
        </Text>

      </View>

    ) : (

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNotification}
        refreshing={refreshing}
        onRefresh={refreshData}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

    )}

  </SafeAreaView>
)};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
    paddingHorizontal: 20,
    paddingTop: 18,
  },

  listContent: {
    paddingBottom: 30,
  },

  /* ---------------- Header ---------------- */

  header: {
    marginBottom: 24,
  },

  heading: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },

  subHeading: {
    marginTop: 8,
    fontSize: 15,
    color: "#64748B",
    lineHeight: 23,
  },

  countBadge: {
    marginTop: 18,
    alignSelf: "flex-start",
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
  },

  countText: {
    color: "#DC2626",
    fontSize: 13,
    fontWeight: "700",
  },

  /* ---------------- Card ---------------- */

  notificationCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,
  },

  content: {
    flex: 1,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    marginRight: 10,
  },

  time: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
  },

  message: {
    marginTop: 8,
    fontSize: 15,
    color: "#475569",
    lineHeight: 23,
  },

  bottomRow: {
    marginTop: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },

  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  /* ---------------- Loading ---------------- */

  loadingContainer: {
    flex: 1,
    backgroundColor: "#F4F7FC",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 16,
    color: "#64748B",
    fontSize: 15,
    fontWeight: "600",
  },

  /* ---------------- Empty ---------------- */

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  emptyTitle: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },

  emptySubtitle: {
    marginTop: 10,
    textAlign: "center",
    color: "#64748B",
    fontSize: 15,
    lineHeight: 24,
  },

});