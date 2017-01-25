/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react';
import {
  TextInput,
  StyleSheet,
} from 'react-native';

const TextField = ({
  fieldRef,
  style,
  label,
  multiline,
  type,
  ...otherProps
}) => (
  <TextInput
    ref={fieldRef}
    style={[multiline ? styles.multiline : styles.input, style]}
    secureTextEntry={type === 'password'}
    placeholder={label}
    multiline={multiline}
    {...otherProps}
  />
);

TextField.propTypes = {
  fieldRef: PropTypes.func,
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
  multiline: {
    fontSize: 17,
    textAlignVertical: 'top',
    paddingTop: 10,
    paddingBottom: 12,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default TextField;
