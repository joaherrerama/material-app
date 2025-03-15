import React from 'react';
import { View, StyleSheet, ScrollView, Share } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useProfileStore } from '@/stores/profileStore';

function ResultCard({ title, amount, subtitle }: { title: string; amount: number; subtitle?: string }) {
  return (
    <View style={styles.card}>
      <Text variant="titleMedium" style={styles.cardTitle}>{title}</Text>
      <Text variant="headlineMedium" style={styles.amount}>${amount.toFixed(2)}</Text>
      {subtitle && <Text variant="bodySmall" style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

export default function ResultsScreen() {
  const profile = useProfileStore(state => state.profile);
  const baseAmount = 5000;
  const withMargin = baseAmount * (1 + (profile.margin / 100));
  const withRate = baseAmount + (profile.hourlyRate * 40); // Assuming 40 hours
  const withBoth = withRate * (1 + (profile.margin / 100));

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Project Estimate Summary:\n\nBase Amount: $${baseAmount}\nWith Margin: $${withMargin}\nWith Professional Rate: $${withRate}\nTotal with Both: $${withBoth}`,
        title: 'Project Estimate',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>Calculation Results</Text>

        <ResultCard
          title="Base Budget"
          amount={baseAmount}
          subtitle="Without margin or professional rate"
        />

        <ResultCard
          title="With Margin"
          amount={withMargin}
          subtitle={`Including ${profile.margin}% margin`}
        />

        <ResultCard
          title="With Professional Rate"
          amount={withRate}
          subtitle={`Including ${profile.hourlyRate}/hr professional rate`}
        />

        <ResultCard
          title="Complete Budget"
          amount={withBoth}
          subtitle="Including both margin and professional rate"
        />

        <Button
          mode="contained"
          onPress={handleShare}
          style={styles.shareButton}
          contentStyle={styles.buttonContent}>
          Share Results
        </Button>
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
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    color: '#2C3E50',
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  amount: {
    color: '#2C3E50',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#7F8C8D',
  },
  shareButton: {
    marginTop: 8,
    backgroundColor: '#2C3E50',
  },
  buttonContent: {
    height: 48,
  },
});