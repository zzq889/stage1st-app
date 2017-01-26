import { fromJS } from 'immutable';
import {
  Platform,
} from 'react-native';
import Color from 'color';
import { NavigationStyles } from '@exponent/ex-navigation';

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

export const keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 80;

export const gestures = (params) => {
  const newParams = { ...params };
  newParams.gestureResponseDistance = 50;
  return NavigationStyles.SlideHorizontal.gestures(newParams);
};

export const defaultRouteConfig = fromJS({
  navigationBar: {
    backgroundColor: palette.black,
    tintColor: palette.inverted,
  },
  styles: {
    gestures,
  },
});

export const defaultAlertStyle = {
  text: { color: palette.foreground },
  container: { backgroundColor: palette.yellow },
  duration: 2000,
};
