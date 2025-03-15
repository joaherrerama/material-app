import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useProfileStore } from '@/stores/profileStore';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function CalculatorScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const profile = useProfileStore(state => state.profile);
  const [loading, setLoading] = useState(false);
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });
  const [calculationType, setCalculationType] = useState(type || 'quick');

  const handleCalculate = async () => {
    setLoading(true);
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/results');
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>Project Calculator</Text>

        <SegmentedButtons
          value={calculationType as string}
          onValueChange={setCalculationType}
          buttons={[
            { value: 'quick', label: 'Quick' },
            { value: 'painting', label: 'Painting' },
            { value: 'flooring', label: 'Flooring' },
            { value: 'drywall', label: 'Drywall' },
          ]}
          style={styles.segment}
        />

        <View style={styles.form}>
          <TextInput
            label="Length (meters)"
            value={dimensions.length}
            onChangeText={(text) => setDimensions(prev => ({ ...prev, length: text }))}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Width (meters)"
            value={dimensions.width}
            onChangeText={(text) => setDimensions(prev => ({ ...prev, width: text }))}
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Height (meters)"
            value={dimensions.height}
            onChangeText={(text) => setDimensions(prev => ({ ...prev, height: text }))}
            keyboardType="numeric"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleCalculate}
            style={styles.button}
            contentStyle={styles.buttonContent}>
            Calculate
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
  },
  content: {
    padding: 16,
    paddingTop: 48,
  },
  title: {
    marginBottom: 24,
    color: '#2C3E50',
    fontFamily: 'Inter-Bold',
  },
  segment: {
    marginBottom: 24,
  },
  form: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#2C3E50',
  },
  buttonContent: {
    height: 48,
  },
});