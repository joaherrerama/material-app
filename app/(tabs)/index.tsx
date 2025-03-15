import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Paintbrush as Paint, Ruler, Wallet as Wall, Calculator } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

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
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>Dashboard</Text>
        
        <View style={styles.grid}>
          <DashboardCard
            title="Painting Estimate"
            icon={Paint}
            onPress={() => router.push('/calculator?type=painting')}
          />
          <DashboardCard
            title="Flooring Estimate"
            icon={Ruler}
            onPress={() => router.push('/calculator?type=flooring')}
          />
          <DashboardCard
            title="Drywall Estimate"
            icon={Wall}
            onPress={() => router.push('/calculator?type=drywall')}
          />
          <DashboardCard
            title="Quick Calculate"
            icon={Calculator}
            onPress={() => router.push('/calculator')}
          />
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
    backgroundColor: '#2C3E50',
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#2C3E50',
    fontFamily: 'Inter-Bold',
  },
});