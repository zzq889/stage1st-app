import { fromJS } from 'immutable';

const baseColors = {
  black: '#000',
  white: '#fff',
  grey: '#888',
  lightGrey: '#ccc',
  blue: '#448aff',
  red: '#ff5a5f',
  orange: '#f70',
  yellow: '#ffeb3b',
  green: '#1c7',
};

export const palette = {
  ...baseColors,
  primary: baseColors.black,
  secondary: baseColors.red,
  default: baseColors.grey,
  info: baseColors.blue,
  success: baseColors.green,
  warning: baseColors.orange,
  error: baseColors.red,
  inverted: baseColors.white,
  foreground: baseColors.black,
  background: baseColors.white,
};

export const defaultRouteConfig = fromJS({
  navigationBar: {
    backgroundColor: palette.black,
    tintColor: palette.inverted,
  },
});

export const defaultAlertStyle = {
  text: { color: palette.foreground },
  container: { backgroundColor: palette.yellow },
  duration: 1000,
};
