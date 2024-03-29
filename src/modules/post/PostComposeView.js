import React, { PropTypes, Component } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
} from 'react-native';
import { Map } from 'immutable';
import { palette, keyboardVerticalOffset } from '../../styles/config';
import TextField from '../../components/TextField';
import DismissButton from '../../components/DismissButton';
import SubmitButton from '../../components/SubmitButton';
import { postEmitter } from './PostState';

export default class PostComposeView extends Component {
  static navigationOptions = {
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      left: <DismissButton navigation={navigation} />,
      right: <SubmitButton onPress={() => { postEmitter.emit('SUBMIT_POST'); }} />,
    }),
  }

  state = { value: null };

  componentWillMount() {
    this._subscription = postEmitter.addListener(
      'SUBMIT_POST', () => this.props.onSubmit());
    postEmitter.once('POST_CREATION_SUCCESS', this.dismiss);
  }

  componentWillUnmount() {
    this._subscription.remove();
  }

  dismiss = () => {
    this.props.reset();
    this.props.navigation.goBack(null);
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
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
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
