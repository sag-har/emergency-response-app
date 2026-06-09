import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContent}>
          {/* App Title Header */}
          <Text style={styles.title}>Emergency Response App</Text>
          <Text style={styles.subtitle}>Mobile Client Initialized</Text>
          
          {/* Center Status / Loader */}
          <View style={styles.statusContainer}>
            <ActivityIndicator size="large" color="#002f6c" />
            <Text style={styles.statusText}>Connecting to SQL Server Backend...</Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Clean white palette
  },
  mainContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#002f6c', // Professional Academic Blue
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 13,
    color: '#666666',
    marginTop: 5,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  statusText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
});