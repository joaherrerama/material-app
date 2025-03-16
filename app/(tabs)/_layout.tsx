import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { HomeIcon, Calculator, Settings, FileText } from 'lucide-react-native';
import TabBar  from '../../components/TabBar';
import { View, StyleSheet } from 'react-native';
import t from '@/i18n/config';
import { theme } from '@/constants/theme';

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
      tabBar={(props: any) => <TabBar {...props} />}
      screenOptions={
        { headerShown: false }
      }
    >
      <Tabs.Screen
            name="index"
            options={{
                title: "Home"
            }}
        />
        <Tabs.Screen
            name="settings"
            options={{
                title: "Profile"
            }}
        />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    backgroundColor: theme.colors.background,
    padding: 8,
    borderRadius: 8,
  },
});