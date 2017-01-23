import { fromJS } from 'immutable';
import {
  Platform,
} from 'react-native';
import Color from 'color';

const baseColors = {
  black: '#000',
  white: '#fff',
  grey: '#888',
  lightGrey: '#ccc',
  blue: '#448aff',
  navyblue: '#022c80',
  red: '#ff5a5f',
  orange: '#f70',
  yellow: '#ffeb3b',
  green: '#1c7',
  lightgreen: '#F6F7EB',
};

export const palette = {
  ...baseColors,
  lightBlue: Color(baseColors.blue).lighten(0.5).string(),
  lightYellow: Color(baseColors.yellow).lighten(0.5).string(),
  primary: baseColors.black,
  secondary: baseColors.blue,
  default: baseColors.grey,
  info: baseColors.blue,
  success: baseColors.green,
  warning: baseColors.orange,
  error: baseColors.red,
  inverted: baseColors.white,
  foreground: baseColors.navyblue,
  background: baseColors.lightgreen,
  underlayColor: baseColors.lightGrey,
  separator: 'rgba(0,0,0,0.3)',
};

export const rounded = {
  borderRadius: 4,
};

export const keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 80;

export const defaultRouteConfig = fromJS({
  navigationBar: {
    backgroundColor: palette.black,
    tintColor: palette.inverted,
  },
});

export const defaultAlertStyle = {
  text: { color: palette.foreground },
  container: { backgroundColor: palette.yellow },
  duration: 2000,
};
