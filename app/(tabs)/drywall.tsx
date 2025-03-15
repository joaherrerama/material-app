import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, SegmentedButtons, Text } from 'react-native-paper';
import { CalculatorInput } from '@/components/CalculatorInput';
import { DrywallProposal } from '@/components/DrywallProposal';
import { useProfileStore } from '@/stores/profileStore';
import prices from '@/data/prices.json';

export default function DrywallCalculator() {
  const { t } = useTranslation();
  const profile = useProfileStore(state => state.profile);
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });
  const [thickness, setThickness] = useState('half');
  const [result, setResult] = useState<{
    area: number;
    cost: number;
    costWithMargin: number;
  } | null>(null);

  const calculate = () => {
    const l = parseFloat(dimensions.length);
    const w = parseFloat(dimensions.width);
    const h = parseFloat(dimensions.height);

    if (isNaN(l) || isNaN(w) || isNaN(h)) return;

    const area = (l + w) * 2 * h;
    const basePrice = prices.drywall[thickness as keyof typeof prices.drywall];
    const cost = area * basePrice;
    const costWithMargin = cost * (1 + (profile?.margin || 0) / 100);

    setResult({
      area,
      cost,
      costWithMargin,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          {t('calculator.drywall.title')}
        </Text>

        <CalculatorInput
          label={t('calculator.dimensions.length')}
          value={dimensions.length}
          onChangeText={(text) => setDimensions(prev => ({ ...prev, length: text }))}
        />

        <CalculatorInput
          label={t('calculator.dimensions.width')}
          value={dimensions.width}
          onChangeText={(text) => setDimensions(prev => ({ ...prev, width: text }))}
        />

        <CalculatorInput
          label={t('calculator.dimensions.height')}
          value={dimensions.height}
          onChangeText={(text) => setDimensions(prev => ({ ...prev, height: text }))}
        />

        <Text variant="titleMedium" style={styles.sectionTitle}>
          {t('calculator.drywall.thickness')}
        </Text>
        <SegmentedButtons
          value={thickness}
          onValueChange={setThickness}
          buttons={[
            { value: 'half', label: t('calculator.drywall.thicknesses.half') },
            { value: 'fiveEighths', label: t('calculator.drywall.thicknesses.fiveEighths') },
          ]}
          style={styles.segment}
        />

        <Button
          mode="contained"
          onPress={calculate}
          style={styles.button}>
          {t('common.calculate')}
        </Button>

        {result && <DrywallProposal result={result} thickness={thickness} />}
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
  sectionTitle: {
    marginVertical: 8,
    color: '#2C3E50',
    fontFamily: 'Inter-Bold',
  },
  segment: {
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#3498DB',
  },
});