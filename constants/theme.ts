import { MD3LightTheme, configureFonts } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const fontConfig = {
  fontFamily: 'Inter-Regular',
  headingFontFamily: 'Inter-Bold',
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0D47A1', // Darker shade of blue for a more professional look
    secondary: '#1565C0', // Complementary blue shade
    background: '#F5F5F5', // Light grey for a clean background
    surface: '#FFFFFF', // White for surfaces
    accent: '#FF4081', // Modern pink accent color
    error: '#D32F2F', // Standard error color
    text: '#212121', // Dark grey for primary text
    onSurface: '#757575', // Medium grey for secondary text
  },
  fonts: configureFonts({ config: fontConfig }),
};


export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    padding: 16,
    paddingTop: 48,
    marginTop: 20, // Added marginTop to add space at the top
  },
  title: {
    marginBottom: 24,
    color: theme.colors.primary,
    fontFamily: 'Inter-Bold',
  },
});