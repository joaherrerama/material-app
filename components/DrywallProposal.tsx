import React from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useProfileStore } from '@/stores/profileStore';

interface DrywallProposalProps {
  result: {
    area: number;
    cost: number;
    costWithMargin: number;
  };
  thickness: string;
}

export function DrywallProposal({ result, thickness }: DrywallProposalProps) {
  const { t } = useTranslation();
  const profile = useProfileStore(state => state.profile);

  return (
    <View style={styles.container}>
      {profile?.logo && (
        <Image source={{ uri: profile.logo }} style={styles.logo} />
      )}
      {profile?.companyName && (
        <Text variant="titleLarge" style={styles.companyName}>
          {profile.companyName}
        </Text>
      )}
      
      <View style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        {t('calculator.drywall.title')}
      </Text>

      <View style={styles.row}>
        <Text variant="bodyLarge">{t('common.area')}:</Text>
        <Text variant="bodyLarge" style={styles.value}>
          {result.area.toFixed(2)} m²
        </Text>
      </View>

      <View style={styles.row}>
        <Text variant="bodyLarge">{t('calculator.drywall.thickness')}:</Text>
        <Text variant="bodyLarge" style={styles.value}>
          {t(`calculator.drywall.thicknesses.${thickness}`)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text variant="bodyLarge">{t('common.cost')}:</Text>
        <Text variant="bodyLarge" style={styles.value}>
          ${result.cost.toFixed(2)}
        </Text>
      </View>

      {profile?.margin && profile.margin > 0 && (
        <>
          <View style={styles.row}>
            <Text variant="bodyLarge">{t('common.margin')}:</Text>
            <Text variant="bodyLarge" style={styles.value}>
              {profile.margin}%
            </Text>
          </View>

          <View style={styles.row}>
            <Text variant="titleMedium" style={styles.total}>
              {t('common.total')}:
            </Text>
            <Text variant="titleMedium" style={[styles.value, styles.total]}>
              ${result.costWithMargin.toFixed(2)}
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
    }),
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 8,
  },
  companyName: {
    textAlign: 'center',
    color: '#2C3E50',
    fontFamily: 'Inter-Bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ECF0F1',
    marginVertical: 16,
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
  value: {
    fontFamily: 'Inter-Bold',
  },
  total: {
    marginTop: 8,
    color: '#2C3E50',
  },
});