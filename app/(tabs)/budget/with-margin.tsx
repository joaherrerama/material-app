import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useProfileStore } from '@/stores/profileStore';

export default function MarginBudget() {
  const profile = useProfileStore(state => state.profile);
  const margin = (profile?.margin || 10) / 100;

  const dummyData = {
    materials: {
      drywall: 2500,
      paint: 800,
      flooring: 3500,
    },
    labor: {
      installation: 45 * 40, // 40 hours at $45/hr
      finishing: 55 * 24, // 24 hours at $55/hr
      painting: 40 * 32, // 32 hours at $40/hr
    }
  };

  const totalMaterials = Object.values(dummyData.materials).reduce((a, b) => a + b, 0);
  const totalLabor = Object.values(dummyData.labor).reduce((a, b) => a + b, 0);
  const subtotal = totalMaterials + totalLabor;
  const marginAmount = subtotal * margin;
  const total = subtotal + marginAmount;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>Budget with Margin</Text>
        
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Materials</Text>
          {Object.entries(dummyData.materials).map(([key, value]) => (
            <View key={key} style={styles.row}>
              <Text variant="bodyLarge" style={styles.label}>{key}</Text>
              <Text variant="bodyLarge" style={styles.value}>${value.toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.subtotalRow}>
            <Text variant="titleSmall">Subtotal Materials</Text>
            <Text variant="titleSmall">${totalMaterials.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Labor</Text>
          {Object.entries(dummyData.labor).map(([key, value]) => (
            <View key={key} style={styles.row}>
              <Text variant="bodyLarge" style={styles.label}>{key}</Text>
              <Text variant="bodyLarge" style={styles.value}>${value.toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.subtotalRow}>
            <Text variant="titleSmall">Subtotal Labor</Text>
            <Text variant="titleSmall">${totalLabor.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text variant="titleMedium">Subtotal</Text>
            <Text variant="titleMedium">${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text variant="titleMedium">Margin ({(margin * 100).toFixed(0)}%)</Text>
            <Text variant="titleMedium">${marginAmount.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.totalSection}>
          <Text variant="headlineSmall" style={styles.whiteText}>Total</Text>
          <Text variant="headlineSmall" style={styles.whiteText}>${total.toFixed(2)}</Text>
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
  section: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#2C3E50',
    fontFamily: 'Inter-Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    textTransform: 'capitalize',
  },
  value: {
    fontFamily: 'Inter-Bold',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ECF0F1',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2C3E50',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  whiteText: {
    color: 'white',
  },
});