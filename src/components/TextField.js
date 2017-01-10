/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react';
import {
  TextInput,
  StyleSheet,
} from 'react-native';

const TextField = ({ style, input, label, type, ...otherProps }) => (
  <TextInput
    {...input}
    style={[styles.input, style]}
    secureTextEntry={type === 'password'}
    placeholder={label}
    clearButtonMode="while-editing"
    {...otherProps}
  />
);

TextField.propTypes = {
  input: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.number,
  // meta: PropTypes.shape({
  //   touched: PropTypes.bool,
  //   error: PropTypes.string,
  // }),
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    padding: 5,
  },
});

export default TextField;
