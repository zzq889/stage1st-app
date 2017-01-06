/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Field, reduxForm } from 'redux-form/immutable';
import { palette } from '../../styles/config';

const validate = (values) => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};
  if (!values.get('username')) {
    errors.username = 'Required';
  }
  if (!values.get('password')) {
    errors.password = 'Required';
  }
  return errors;
};

const renderField = ({ input, label, type, autoFocus }) => (
  <View>
    <TextInput
      {...input}
      style={styles.input}
      autoCapitalize="none"
      autoCorrect={false}
      underlineColorAndroid="transparent"
      secureTextEntry={type === 'password'}
      placeholder={label}
      autoFocus={autoFocus}
      clearButtonMode="while-editing"
    />
  </View>
);

renderField.propTypes = {
  input: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.string,
  autoFocus: PropTypes.bool,
  // meta: PropTypes.shape({
  //   touched: PropTypes.bool,
  //   error: PropTypes.string,
  // }),
};

const LoginView = ({ handleSubmit, invalid, submitting }) => {
  const disabled = invalid || submitting;
  return (
    <View style={styles.outerContainer}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Field
          name="username"
          type="text"
          component={renderField}
          label="用户名"
          autoFocus
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="密码"
        />
        <View>
          <TouchableOpacity
            style={disabled ? [styles.button, styles.disabled] : styles.button}
            disabled={disabled}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>登录</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

LoginView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  // reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'loginForm',
  validate,
})(LoginView);

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 15,
  },
  input: {
    height: 40,
    padding: 5,
    borderColor: palette.grey,
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.primary,
  },
  disabled: {
    backgroundColor: palette.lightGrey,
  },
  buttonText: {
    color: palette.white,
  },
});
