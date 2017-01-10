/* eslint-disable react/forbid-prop-types, react/prefer-stateless-function */

import React, { PropTypes, Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Map, List } from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable';
import { palette, keyboardVerticalOffset } from '../../styles/config';
import TextField from '../../components/TextField';
import Picker from '../../components/Picker';

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

class ThreadComposeView extends Component {
  state = {
    isExpand: false,
  }

  render() {
    const { handleSubmit, types, invalid, submitting } = this.props;
    const disabled = invalid || submitting;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={keyboardVerticalOffset}
        behavior="padding"
        style={styles.container}
      >
        <TouchableOpacity
          style={disabled ? [styles.button, styles.disabled] : styles.button}
          disabled={disabled}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>提交</Text>
        </TouchableOpacity>
        <Field
          name="title"
          type="text"
          component={renderField}
          label="请输入标题"
          autoFocus
        />
        <View style={styles.separator} />
        <Field
          name="typeid"
          type="picker"
          component={Picker}
          isExpand={this.state.isExpand}
          toggleExpand={() => { this.setState({ isExpand: !this.state.isExpand }); }}
          items={types.map(type => Map({ label: type.get('type'), value: type.get('typeid') }))}
          label="主题分类"
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
  }
}

ThreadComposeView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  // reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  types: PropTypes.instanceOf(List),
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
    backgroundColor: palette.secondary,
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
  enableReinitialize: true,
  validate,
})(ThreadComposeView);
