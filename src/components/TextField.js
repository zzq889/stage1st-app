/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react';
import {
  TextInput,
  StyleSheet,
} from 'react-native';

const TextField = ({
  style,
  label,
  multiline,
  type,
  ...otherProps
}) => (
  <TextInput
    style={[multiline ? styles.textarea : styles.input, style]}
    secureTextEntry={type === 'password'}
    placeholder={label}
    multiline={multiline}
    {...otherProps}
  />
);

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.number,
  multiline: PropTypes.bool,
  // meta: PropTypes.shape({
  //   touched: PropTypes.bool,
  //   error: PropTypes.string,
  // }),
};

const styles = StyleSheet.create({
  input: {
    fontSize: 17,
    height: 44,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textarea: {
    fontSize: 17,
    paddingTop: 10,
    paddingBottom: 12,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default TextField;
