import { MD3LightTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  fontFamily: 'Inter-Regular',
  headingFontFamily: 'Inter-Bold',
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2C3E50',
    secondary: '#3498DB',
    background: '#ECF0F1',
    surface: '#FFFFFF',
  },
  fonts: configureFonts({ config: fontConfig }),
};