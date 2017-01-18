import React, { PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { postEmitter } from './PostState';
import { palette } from '../../styles/config';

const SubmitButton = ({ invalid, submitting }) => {
  const disabled = invalid || submitting;
  return (
    <TouchableOpacity
      style={styles.iconContainer}
      disabled={disabled}
      onPress={() => { postEmitter.emit('submitPost'); }}
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
    flex: 1,
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
