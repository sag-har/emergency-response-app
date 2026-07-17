import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

import API from "../services/api";

import Header from "../components/Header";
import NotificationCard from "../components/NotificationCard";
import LoadingOverlay from "../components/LoadingOverlay";
import EmptyState from "../components/EmptyState";

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

      const response = await API.get(
        "/notifications"
      );

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

  if (loading) {

    return (
      <LoadingOverlay
        message="Loading Notifications..."
      />
    );

  }

  return (

    <SafeAreaView style={styles.container}>

      <Header
        title="Notifications"
        navigation={navigation}
      />

      {notifications.length === 0 ? (

        <EmptyState
          icon="🔔"
          title="No Notifications"
          subtitle="You don't have any notifications yet."
        />

      ) : (

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshing={refreshing}
          onRefresh={refreshData}
          renderItem={({ item }) => (
            <NotificationCard
              notification={item}
            />
          )}
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

  list: {
    padding: 20,
    paddingBottom: 30,
  },

});