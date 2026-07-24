import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress, type = 'primary' }) {
  return (
    <TouchableOpacity 
      style={[styles.btn, { backgroundColor: type === 'primary' ? '#1a1a1a' : '#d9534f' }]} 
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { width: '100%', padding: 15, borderRadius: 8, alignItems: 'center', marginVertical: 5 },
  text: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});