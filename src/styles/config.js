import {
  Platform,
} from 'react-native';
import Color from 'color';

const baseColors = {
  black: '#1C1D21',
  white: '#fff',
  grey: '#888',
  lightGrey: '#ccc',
  transGrey: 'rgba(0,0,0,0.4)',
  blue: '#448aff',
  navyBlue: '#022c80',
  red: '#ff5a5f',
  orange: '#EE5023',
  yellow: '#ffeb3b',
  green: '#1c7',
  mint: '#F6F7EB',
  mint2: '#E6EAD9',
  mint3: '#CFD9BF',
  deepMint: '#A3A78E',
  lightMint: '#b1c641',
};

export const palette = {
  ...baseColors,
  lightBlue: Color(baseColors.blue).lighten(0.5).string(),
  lightYellow: Color(baseColors.yellow).lighten(0.5).string(),
  primary: baseColors.navyBlue,
  secondary: baseColors.deepMint,
  default: baseColors.transGrey,
  info: baseColors.blue,
  success: baseColors.green,
  warning: baseColors.orange,
  error: baseColors.red,
  inverted: baseColors.white,
  foreground: baseColors.navyBlue,
  background: baseColors.mint,
  underlayColor: baseColors.mint3,
  toolbar: baseColors.mint3,
  tabbar: baseColors.mint2,
  separator: baseColors.mint3,
  // separator: '#8E8E8E',
};

export const rounded = {
  borderRadius: 4,
};

export const gestureResponseDistance = 50;

export const keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 80;

export const header = (navigation, defaultHeader) => ({
  ...defaultHeader,
  style: {
    backgroundColor: palette.lightMint,
  },
  tintColor: palette.inverted,
  visible: true,
  titleStyle: {
    textAlign: 'center',
  },
});

export const defaultAlertStyle = {
  text: { color: palette.foreground },
  container: { backgroundColor: palette.yellow },
  duration: 2000,
};
