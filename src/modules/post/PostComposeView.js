import React, { PropTypes, Component } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
} from 'react-native';
import { Map } from 'immutable';
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
    const children = (
      <TextField
        style={styles.textarea}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        multiline
        autoFocus
        value={this.props.values.get('content')}
        onChangeText={val => this.props.onChange('content', val)}
      />
    );

    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView
          keyboardVerticalOffset={keyboardVerticalOffset}
          behavior="padding"
          style={styles.container}
        >
          {children}
        </KeyboardAvoidingView>
      );
    }
    return (
      <View style={styles.container}>
        {children}
      </View>
    );
  }
}

PostComposeView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.instanceOf(Map),
  onChange: PropTypes.func.isRequired,
  navigator: PropTypes.shape({
    pop: PropTypes.func.isRequired,
  }),
  reset: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  textarea: {
    flex: 1,
  },
});
