import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { palette } from '../styles/config';

const TouchableCell = ({ style, backgroundColor, children, ...props }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.row, backgroundColor && { backgroundColor }, style]}
      delayPressIn={30}
      {...props}
    >
      {children}
    </TouchableOpacity>
  </View>
);

TouchableCell.propTypes = {
  style: PropTypes.number,
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.underlayColor,
  },
  row: {
    flex: 1,
    backgroundColor: palette.background,
  },
});

export default TouchableCell;
