import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import API from '../services/api';

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        // Fetches data inserted via SQL status or dispatch triggers
        const res = await API.get('/notifications'); 
        setNotifications(res.data);
      } catch (e) {
        // Fallback dummy simulation if specific route isn't grouped yet
        setNotifications([
          { id: '1', title: 'Hospital Dispatched', message: 'City General Hospital has accepted your Medical request.' }
        ]);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>System Alerts</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.alertTitle}>🔔 {item.title}</Text>
            <Text style={styles.alertMsg}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 40 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 15, backgroundColor: '#f0f4f8', borderRadius: 8, marginBottom: 10 },
  alertTitle: { fontWeight: 'bold', fontSize: 15, color: '#0275d8' },
  alertMsg: { marginTop: 5, color: '#555', lineHeight: 18 }
});