import React, { PropTypes, Component } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Map } from 'immutable';
import { NavigationStyles } from '@exponent/ex-navigation';
import { palette, rounded, keyboardVerticalOffset } from '../../styles/config';
import TextField from '../../components/TextField';
import PreImage from '../../../images/pre.png';
import CircleView from '../../components/CircleView';
import DismissButton from '../../components/DismissButton';
import { authEmitter } from './AuthState';

const validate = (values) => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};
  if (!values.get('username')) {
    errors.username = 'Required';
  }
  if (!values.get('password')) {
    errors.password = 'Required';
  }
  return Map(errors);
};

class LoginView extends Component {
  static route = {
    navigationBar: {
      title: 'Login',
      backgroundColor: palette.black,
      tintColor: palette.inverted,
      renderLeft: () => <DismissButton />,
    },
    styles: {
      ...NavigationStyles.SlideVertical,
      gestures: null,
    },
  }

  componentWillMount() {
    this._subscription = authEmitter.once('dismiss', this.dismiss);
  }

  componentWillUnmount() {
    this.props.reset();
    this._subscription.remove();
  }

  dismiss = () => {
    this.props.navigator.pop();
  }

  render() {
    const {
      onSubmit,
      // invalid,
      submitting,
      values,
      onChange,
    } = this.props;
    const invalid = validate(values).size > 0;
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
          alwaysBounceVertical={false}
        >
          <CircleView size={100} source={PreImage} style={styles.image} />
          <TextField
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            clearButtonMode="while-editing"
            label="username"
            type="text"
            value={values.get('username')}
            onChangeText={val => onChange('username', val)}
            autoFocus
            onSubmitEditing={() => { this.passField.focus(); }}
          />
          <TextField
            ref={(c) => { this.passField = c; }}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            clearButtonMode="while-editing"
            label="password"
            type="password"
            value={values.get('password')}
            onChangeText={val => onChange('password', val)}
          />
          <TouchableOpacity
            style={disabled ? [styles.button, styles.disabled] : styles.button}
            disabled={disabled}
            onPress={() => onSubmit()}
          >
            <Text style={styles.buttonText}>登录</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  values: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  navigator: PropTypes.shape({
    pop: PropTypes.func.isRequired,
  }),
};

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

export default LoginView;
