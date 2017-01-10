import React, { PropTypes } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { Field, reduxForm } from 'redux-form/immutable';
import { palette } from '../../styles/config';

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

const ThreadComposeView = () => (
  <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <Field
      name="title"
      type="text"
      component={View}
      label="请输入标题"
    />
    <Field
      name="content"
      type="text"
      component={View}
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

export default reduxForm({
  form: 'composeForm',
  validate,
})(ThreadComposeView);
