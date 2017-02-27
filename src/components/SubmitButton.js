import React, { PropTypes } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { palette } from '../styles/config';

const SubmitButton = ({ invalid, submitting, ...props }) => {
  const disabled = invalid || submitting;
  if (submitting) {
    return <ActivityIndicator />;
  }
  return (
    <TouchableOpacity
      style={styles.iconContainer}
      disabled={disabled}
      {...props}
    >
      <Text style={disabled ? [styles.text, styles.disabled] : styles.text}>发布</Text>
    </TouchableOpacity>
  );
};

SubmitButton.propTypes = {
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: palette.white,
    marginRight: 10,
    marginLeft: 16,
    fontSize: 17,
  },
  disabled: {
    color: palette.grey,
  },
});

export default SubmitButton;
