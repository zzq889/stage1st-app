/* eslint-disable react/forbid-prop-types, react/prefer-stateless-function */

import React, { PropTypes, Component } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { List } from 'immutable';
import { NavigationStyles } from '@exponent/ex-navigation';
// import { Field, reduxForm } from 'redux-form/immutable';
import { palette, keyboardVerticalOffset } from '../../styles/config';
import TextField from '../../components/TextField';
import DismissButton from '../../components/DismissButton';
import SubmitButton from './SubmitButton';
import { postEmitter } from './PostState';

// const renderArea = props => (
//   <TextField
//     autoCapitalize="none"
//     autoCorrect={false}
//     underlineColorAndroid="transparent"
//     multiline
//     {...props}
//   />
// );

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

  componentWillMount() {
    // this._subscription = postEmitter.addListener('submitPost', this.props.handleSubmit);
  }

  componentWillUnmount() {
    // this._subscription.remove();
  }

  render() {
    // const { types } = this.props;
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
        />
      </KeyboardAvoidingView>
    );
  }
}

PostComposeView.propTypes = {
  // handleSubmit: PropTypes.func.isRequired,
  types: PropTypes.instanceOf(List),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textarea: {
    flex: 1,
  },
});
