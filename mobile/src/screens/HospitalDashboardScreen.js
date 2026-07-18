import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import API from '../services/api';

export default function HospitalDashboardScreen() {
  const [cases, setCases] = useState([
    { id: 'REQ-1784290460175-255', type: 'Accident', status: 'Pending' }
  ]);

  const dispatchHospital = async (requestId) => {
    try {
      const payload = {
        emergencyId: String(requestId).trim(),
        hospitalId: "h1" // Authenticated Hospital Node
      };

      // 🛠️ FIX: Target route mapped explicitly to match backend routing registry
      const res = await API.post('/emergency/hospital/assign', payload);
      
      if (res.data.success || res.data.message?.includes("assigned")) {
        Alert.alert("Success", "Ambulance dispatched successfully.");
        setCases(prevCases => 
          prevCases.map(c => c.id === requestId ? { ...c, status: 'Dispatched' } : c)
        );
      }
    } catch (err) {
      console.error("Dashboard Dispatch Core Engine Crash:", err);
      const serverMessage = err.response?.data?.message || "MSSQL active transaction rollback error.";
      Alert.alert("Dispatch Error", serverMessage);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Hospital Control Room</Text>
        <FlatList
          data={cases}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <Text style={styles.incidentId}>Incident: {item.id}</Text>
              <Text style={styles.classification}>Classification: {item.type}</Text>
              <Text style={[styles.statusState, item.status === 'Dispatched' && styles.statusDispatched]}>
                State: {item.status}
              </Text>
              
              {item.status === 'Pending' && (
                <TouchableOpacity style={styles.goBtn} onPress={() => dispatchHospital(item.id)}>
                  <Text style={styles.goText}>Accept & Deploy Ambulance</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f6f9' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1E293B' },
  listContainer: { paddingBottom: 20 },
  box: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, marginBottom: 15 },
  incidentId: { fontWeight: '700', fontSize: 15, color: '#0F172A' },
  classification: { marginVertical: 6, color: '#475569', fontSize: 14 },
  statusState: { marginBottom: 12, color: '#DC2626', fontWeight: '700' },
  statusDispatched: { color: '#16A34A' },
  goBtn: { backgroundColor: '#16A34A', padding: 14, borderRadius: 8, alignItems: 'center' },
  goText: { color: '#fff', fontWeight: 'bold', fontSize: 15 }
});