import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { Chrome as Home, Calculator, Settings, FileText } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';
import t from '@/i18n/config';

function IconWrapper({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.iconWrapper}>
      {children}
    </View>
  );
}

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: theme.colors.surface,
        borderTopWidth: 0,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      tabBarActiveTintColor: '#95A5A6',
      tabBarInactiveTintColor: '#95A5A6',
      }}>
      <Tabs.Screen
      name="index"
      options={{
        title: t.t('welcome'),
        tabBarIcon: ({ color, size }) => (
        <IconWrapper>
          <Home size={size} color={color} />
        </IconWrapper>
        ),
      }}
      />
      <Tabs.Screen
      name="calculator"
      options={{
        title: t.t('calculate'),
        tabBarIcon: ({ color, size }) => (
        <IconWrapper>
          <Calculator size={size} color={color} />
        </IconWrapper>
        ),
      }}
      />
      <Tabs.Screen
      name="results"
      options={{
        title: t.t('results'),
        tabBarIcon: ({ color, size }) => (
        <IconWrapper>
          <FileText size={size} color={color} />
        </IconWrapper>
        ),
      }}
      />
      <Tabs.Screen
      name="settings"
      options={{
        title: t.t('settings'),
        tabBarIcon: ({ color, size }) => (
        <IconWrapper>
          <Settings size={size} color={color} />
        </IconWrapper>
        ),
      }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    backgroundColor: '#2C3E50',
    padding: 8,
    borderRadius: 8,
  },
});