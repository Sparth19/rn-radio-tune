import { Platform } from 'react-native';

export const colors = {
  bg: '#0B0E14',
  card: '#141926',
  cardAlt: '#1A2033',
  text: '#F6F2EC',
  textMuted: '#B8B3AA',
  accent: '#FFB347',
  accentSoft: '#FFD6A6',
  success: '#3DDC97',
  danger: '#FF6B6B',
  stroke: '#2A3147',
};

export const fonts = {
  display: Platform.select({
    ios: 'AvenirNext-DemiBold',
    android: 'serif',
    default: 'System',
  }) as string,
  body: Platform.select({
    ios: 'AvenirNext-Regular',
    android: 'sans-serif',
    default: 'System',
  }) as string,
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  xxl: 36,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
};
