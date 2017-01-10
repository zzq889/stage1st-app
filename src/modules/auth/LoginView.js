import React, { PropTypes } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Field, reduxForm } from 'redux-form/immutable';
import { palette, rounded, keyboardVerticalOffset } from '../../styles/config';
import TextField from '../../components/TextField';
import PreImage from '../../../images/pre.png';
import CircleView from '../../components/CircleView';

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

const renderField = props => (
  <TextField
    style={styles.input}
    autoCapitalize="none"
    autoCorrect={false}
    underlineColorAndroid="transparent"
    clearButtonMode="while-editing"
    {...props}
  />
);

const LoginView = ({ handleSubmit, invalid, submitting }) => {
  const disabled = invalid || submitting;
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior="padding"
      style={styles.container}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps
        keyboardDismissMode="on-drag"
      >
        <CircleView size={100} source={PreImage} style={styles.image} />
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
        <TouchableOpacity
          style={disabled ? [styles.button, styles.disabled] : styles.button}
          disabled={disabled}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>登录</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  container: {
    flex: 1,
  },
  content: {
    margin: 15,
  },
  image: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  input: {
    ...rounded,
    borderColor: palette.grey,
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    ...rounded,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.primary,
    marginBottom: 40,
  },
  disabled: {
    backgroundColor: palette.lightGrey,
  },
  buttonText: {
    color: palette.white,
  },
});
