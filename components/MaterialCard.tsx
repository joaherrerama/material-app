import React from 'react';
import { Pressable, StyleSheet, Text, View, ImageBackground, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';
import { Video as LucideIcon } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface MaterialCardProps {
  title: string;
  icon: LucideIcon;
  route: string;
  color: string;
  image: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function MaterialCard({ title, icon: Icon, route, color, image }: MaterialCardProps) {
  const router = useRouter();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.95);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      style={[styles.cardWrapper, animatedStyle]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={() => router.push(route)}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.card}
        imageStyle={styles.cardImage}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}>
          <View style={[styles.iconContainer, { backgroundColor: color }]}>
            <Icon size={32} color="white" />
          </View>
          <Text style={styles.title}>{title}</Text>
        </LinearGradient>
      </ImageBackground>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
    }),
  },
  card: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardImage: {
    borderRadius: 20,
  },
  gradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});