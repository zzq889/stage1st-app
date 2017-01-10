/* eslint-disable react/forbid-prop-types, react/prefer-stateless-function */

import React, { PropTypes, Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { Map, List } from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable';
import { palette, keyboardVerticalOffset } from '../../styles/config';
import TextField from '../../components/TextField';
import Picker from '../../components/Picker';
import { threadEmitter } from './ThreadState';
import validate from './threadValidate';

const CHAR_LIMIT = 80;

const renderField = (props) => {
  const charLeft = CHAR_LIMIT - unescape(encodeURIComponent(props.input.value)).length;
  return (
    <View style={styles.row}>
      <TextField
        style={styles.container}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        clearButtonMode="while-editing"
        {...props}
      />
      <Text style={charLeft < 0 ? [styles.counter, styles.counterError] : styles.counter}>
        {charLeft}
      </Text>
    </View>
  );
};

renderField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
  }),
};

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

  componentWillMount() {
    this._subscription = threadEmitter.addListener('submitThread', this.props.handleSubmit);
  }

  componentWillUnmount() {
    this._subscription.remove();
  }

  render() {
    const { types } = this.props;
    return (
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
          name="typeid"
          type="picker"
          component={Picker}
          isExpand={this.state.isExpand}
          toggleExpand={() => { this.setState({ isExpand: !this.state.isExpand }); }}
          items={types.map(type => Map({ label: type.get('type'), value: type.get('typeid') }))}
          label="主题分类"
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
  // reset: PropTypes.func.isRequired,
  types: PropTypes.instanceOf(List),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  counter: {
    alignSelf: 'center',
    textAlign: 'right',
    margin: 10,
    fontFamily: Platform.OS === 'ios' ? 'menlo' : 'monospace',
  },
  counterError: {
    color: palette.red,
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
