import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        {/* App Title Header */}
        <Text style={styles.title}>Emergency Response App</Text>
        <Text style={styles.subtitle}>System Initialization</Text>
        
        {/* Center Status / Loader */}
        <View style={styles.statusContainer}>
          <ActivityIndicator size="large" color="#002f6c" />
          <Text style={styles.statusText}>Connecting to core models...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Clean white
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