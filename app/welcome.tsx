import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function WelcomeScreen() {
  const router = useRouter();

  const { t } = useTranslation();
  const handleGetStarted = () => {
    router.replace('/(tabs)/settings');
  };

  return (
    <View style={styles.container}>
      <AnimatedView entering={FadeIn.duration(1000)} style={styles.content}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1631624215749-b10b3dd7bca7?auto=format&fit=crop&w=600' }}
          style={styles.logo}
        />

        <Text variant="displaySmall" style={styles.title}>
          {t('init.title', 'Construction Calculator Pro')}
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          {t('init.text','Streamline your construction estimates with precision and professionalism')}
        </Text>
        <Button
          mode="contained"
          onPress={handleGetStarted}
          style={styles.button}
          contentStyle={styles.buttonContent}>
          Get Started
        </Button>
      </AnimatedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#2C3E50',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 48,
    color: '#34495E',
    fontFamily: 'Inter-Regular',
  },
  button: {
    width: '100%',
    maxWidth: 300,
    borderRadius: 12,
    backgroundColor: '#2C3E50',
  },
  buttonContent: {
    height: 56,
  },
});