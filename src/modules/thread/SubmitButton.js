import React, { PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { reduxForm } from 'redux-form/immutable';
import { threadEmitter } from './ThreadState';
import validate from './threadValidate';
import { palette } from '../../styles/config';

const SubmitButton = ({ invalid, submitting }) => {
  const disabled = invalid || submitting;
  return (
    <TouchableOpacity
      style={styles.iconContainer}
      disabled={disabled}
      onPress={() => { threadEmitter.emit('submitThread'); }}
    >
      <Text style={disabled ? [styles.text, styles.disabled] : styles.text}>发布</Text>
    </TouchableOpacity>
  );
};

SubmitButton.propTypes = {
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
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

export default reduxForm({
  form: 'composeForm',
  enableReinitialize: true,
  validate,
})(SubmitButton);
