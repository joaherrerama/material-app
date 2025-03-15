import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, SegmentedButtons, Text } from 'react-native-paper';
import { CalculatorInput } from '@/components/CalculatorInput';

export default function PaintingCalculator() {
  const { t } = useTranslation();
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
  });
  const [mode, setMode] = useState('full');
  const [paintType, setPaintType] = useState('matte');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const l = parseFloat(dimensions.length);
    const w = parseFloat(dimensions.width);
    const h = parseFloat(dimensions.height);

    if (isNaN(l) || isNaN(w) || isNaN(h)) return;

    const area = mode === 'full'
      ? l * w * 3
      : (l + w) * 2 * h;

    setResult(area);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          {t('calculator.painting.title')}
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
          {t('calculator.painting.mode')}
        </Text>
        <SegmentedButtons
          value={mode}
          onValueChange={setMode}
          buttons={[
            { value: 'full', label: t('calculator.painting.modes.full') },
            { value: 'walls', label: t('calculator.painting.modes.walls') },
          ]}
          style={styles.segment}
        />

        <Text variant="titleMedium" style={styles.sectionTitle}>
          {t('calculator.painting.type')}
        </Text>
        <SegmentedButtons
          value={paintType}
          onValueChange={setPaintType}
          buttons={[
            { value: 'matte', label: t('calculator.painting.types.matte') },
            { value: 'gloss', label: t('calculator.painting.types.gloss') },
          ]}
          style={styles.segment}
        />

        <Button
          mode="contained"
          onPress={calculate}
          style={styles.button}>
          {t('common.calculate')}
        </Button>

        {result !== null && (
          <View style={styles.result}>
            <Text variant="titleLarge">
              {t('common.area')}: {result.toFixed(2)} m²
            </Text>
          </View>
        )}
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
  result: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
});