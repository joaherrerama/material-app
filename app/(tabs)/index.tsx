import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Paintbrush as Paint, Ruler, Wallet as Wall, Calculator } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { t } from 'i18next';
import { globalStyles, theme } from '@/constants/theme';
import LanguagePicker from '@/components/LanguagePicker';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function DashboardCard({ title, icon: Icon, onPress }: { title: string; icon: any; onPress: () => void }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      style={[styles.card, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon size={32} color="white" />
      </View>
      <Text variant="titleMedium" style={styles.cardTitle}>{title}</Text>
    </AnimatedPressable>
  );
}

export default function Dashboard() {
  const router = useRouter();

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.content}>
        <Text variant="headlineMedium" style={[globalStyles.title, { textAlign: 'center' }]}>
          {t("dashboard.title")}
        </Text>

        <Text variant="bodyLarge" style={styles.subtitle}>
          {t("dashboard.text")}
        </Text>
        
        <View style={[styles.grid, { justifyContent: 'center', marginTop: 10 }]}>
          <View style={{ width: '50%', alignItems: 'center' }}>
            <DashboardCard
              title="Painting"
              icon={Paint}
              onPress={() => router.push('/calculator?type=painting')}
            />
          </View>
          <View style={{ width: '50%', alignItems: 'center' }}>
            <DashboardCard
              title="Flooring"
              icon={Ruler}
              onPress={() => router.push('/calculator?type=flooring')}
            />
          </View>
          <View style={{ width: '50%', alignItems: 'center' }}>
            <DashboardCard
              title="Drywall"
              icon={Wall}
              onPress={() => router.push('/calculator?type=drywall')}
            />
          </View>
          <View style={{ width: '50%', alignItems: 'center' }}>
            <DashboardCard
              title="Drywall"
              icon={Wall}
              onPress={() => router.push('/calculator?type=drywall')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  card: {
    width: '50%',
    padding: 8,
  },
  iconContainer: {
    backgroundColor: theme.colors.primary,
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: theme.colors.primary,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20 ,
    color: theme.colors.shadow,
    fontFamily: 'Inter-Regular',
  }
});