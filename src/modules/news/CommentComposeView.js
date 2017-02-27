import React, { PropTypes, Component } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
} from 'react-native';
import { Map } from 'immutable';
import { newsEmitter } from './NewsState';
import { palette, keyboardVerticalOffset } from '../../styles/config';
import TextField from '../../components/TextField';
import DismissButton from '../../components/DismissButton';
import SubmitButton from '../../components/SubmitButton';
import formConnect from '../form/formConnect';

const CommentComposeButton = formConnect('commentComposeForm')(SubmitButton);

export default class CommentComposeView extends Component {
  static navigationOptions = {
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      left: <DismissButton navigation={navigation} />,
      right: (
        <CommentComposeButton onPress={() => { newsEmitter.emit('SUBMIT_COMMENT'); }} />
      ),
    }),
  }

  state = { value: null };

  componentDidMount() {
    this._subscription = newsEmitter.addListener('SUBMIT_COMMENT', () => {
      this.props.onSubmit();
    });
    newsEmitter.once('COMMENT_CREATION_SUCCESS', this.dismiss);
  }

  componentWillUnmount() {
    this._subscription.remove();
    this.props.reset();
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

CommentComposeView.propTypes = {
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
