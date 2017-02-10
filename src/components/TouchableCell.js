import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { palette } from '../styles/config';

const TouchableCell = ({ style, children, ...props }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.row, style]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  </View>
);

TouchableCell.propTypes = {
  children: PropTypes.node,
  style: PropTypes.number,
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
