import React, { PropTypes } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { Field, reduxForm } from 'redux-form/immutable';
import { palette, keyboardVerticalOffset } from '../../styles/config';
import TextField from '../../components/TextField';

const validate = (values) => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};
  if (!values.get('typeid')) {
    errors.typeid = 'Required';
  }
  if (!values.get('title')) {
    errors.title = 'Required';
  }
  if (!values.get('content')) {
    errors.content = 'Required';
  }
  return errors;
};

const renderField = props => (
  <TextField
    autoCapitalize="none"
    autoCorrect={false}
    underlineColorAndroid="transparent"
    clearButtonMode="while-editing"
    {...props}
  />
);

const renderArea = props => (
  <TextField
    autoCapitalize="none"
    autoCorrect={false}
    underlineColorAndroid="transparent"
    multiline
    {...props}
  />
);

const ThreadComposeView = () => (
  <KeyboardAvoidingView
    keyboardVerticalOffset={keyboardVerticalOffset}
    behavior="padding"
    style={styles.container}
  >
    <Field
      name="title"
      type="text"
      component={renderField}
      label="请输入标题"
      autoFocus
    />
    <View style={styles.separator} />
    <Field
      style={styles.textarea}
      name="content"
      type="text"
      component={renderArea}
      label="请输入正文"
    />
  </KeyboardAvoidingView>
);

ThreadComposeView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  // reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: palette.separator,
  },
  textarea: {
    flex: 1,
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

export default reduxForm({
  form: 'composeForm',
  validate,
})(ThreadComposeView);
