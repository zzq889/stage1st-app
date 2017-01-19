/* eslint-disable react/forbid-prop-types, react/prefer-stateless-function */

import React, { PropTypes, Component } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { NavigationStyles } from '@exponent/ex-navigation';
import { palette, keyboardVerticalOffset } from '../../styles/config';
import TextField from '../../components/TextField';
import DismissButton from '../../components/DismissButton';
import SubmitButton from './SubmitButton';
import { postEmitter } from './PostState';


export default class PostComposeView extends Component {
  static route = {
    navigationBar: {
      title: ({ title }) => title || '回复',
      backgroundColor: palette.black,
      tintColor: palette.inverted,
      renderLeft: () => <DismissButton />,
      renderRight: () => <SubmitButton />,
    },
    styles: {
      ...NavigationStyles.SlideVertical,
      gestures: null,
    },
  }

  state = { value: null };

  componentWillMount() {
    this._subscription = postEmitter.addListener(
      'submitPost', () => this.props.onSubmit());
    postEmitter.once('POST_CREATION_SUCESS', this.dismiss);
  }

  componentWillUnmount() {
    this._subscription.remove();
  }

  dismiss = () => {
    this.props.reset();
    this.props.navigator.pop();
  }

  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={keyboardVerticalOffset}
        behavior="padding"
        style={styles.container}
      >
        <TextField
          style={styles.textarea}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          multiline
          autoFocus
          value={this.props.content}
          onChangeText={val => this.props.onContentChange(val)}
        />
      </KeyboardAvoidingView>
    );
  }
}

PostComposeView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  content: PropTypes.string,
  onContentChange: PropTypes.func.isRequired,
  navigator: PropTypes.shape({
    pop: PropTypes.func.isRequired,
  }),
  reset: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textarea: {
    flex: 1,
  },
});
