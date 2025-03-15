import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';

export function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2C3E50" />
      <Text style={styles.text}>Calculating...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECF0F1',
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    color: '#2C3E50',
    fontFamily: 'Inter-Regular',
  },
});