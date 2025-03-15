import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

interface CalculatorInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

export function CalculatorInput({ label, value, onChangeText, error }: CalculatorInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        mode="outlined"
        error={!!error}
        style={styles.input}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
  },
  error: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
});