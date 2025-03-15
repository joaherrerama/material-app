import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function BudgetLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#666666',
      }}>
      <Tabs.Screen
        name="base"
        options={{
          title: 'Base Budget',
        }}
      />
      <Tabs.Screen
        name="with-margin"
        options={{
          title: 'With Margin',
        }}
      />
    </Tabs>
  );
}