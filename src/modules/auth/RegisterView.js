import React, { PropTypes, Component } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Map } from 'immutable';
import { palette, rounded, keyboardVerticalOffset } from '../../styles/config';
import TextField from '../../components/TextField';
import PreImage from '../../../images/pre.png';
import CircleView from '../../components/CircleView';
import DismissButton from '../../components/DismissButton';
import { authEmitter } from './AuthState';

class RegisterView extends Component {
  static navigationOptions = {
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      left: <DismissButton navigation={navigation} />,
    }),
  }

  componentWillMount() {
    this.props.resetAuth('isSubmitting', false);
    this._subscription = authEmitter.once('LOGIN.SUCCESS', this.dismiss);
  }

  componentWillUnmount() {
    this.props.reset();
    this._subscription.remove();
  }

  dismiss = () => {
    this.props.navigation.goBack(null);
  }

  render() {
    const {
      onSubmit,
      invalid,
      isSubmitting,
      values,
      onChange,
    } = this.props;
    const disabled = invalid || isSubmitting;
    const children = (
      <View style={styles.content}>
        <CircleView size={100} source={PreImage} style={styles.image} />
        <TextField
          fieldRef={(c) => { this.emailField = c; }}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          clearButtonMode="while-editing"
          label="邮箱"
          keyboardType="email-address"
          type="text"
          value={values.get('email')}
          onChangeText={val => onChange('email', val)}
          autoFocus
          onSubmitEditing={() => { this.nameField.focus(); }}
          disabled={isSubmitting}
        />
        <TextField
          fieldRef={(c) => { this.nameField = c; }}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          clearButtonMode="while-editing"
          label="用户名"
          type="text"
          value={values.get('username')}
          onChangeText={val => onChange('username', val)}
          onSubmitEditing={() => { this.passField.focus(); }}
          disabled={isSubmitting}
        />
        <TextField
          fieldRef={(c) => { this.passField = c; }}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          clearButtonMode="while-editing"
          label="请输入密码"
          type="password"
          value={values.get('password')}
          onChangeText={val => onChange('password', val)}
          disabled={isSubmitting}
        />
        <TouchableOpacity
          style={invalid ? [styles.button, styles.disabled] : styles.button}
          disabled={disabled}
          onPress={() => {
            this.nameField.blur();
            this.passField.blur();
            onSubmit();
          }}
        >
          {
            isSubmitting
            ? <ActivityIndicator color={palette.white} />
            : <Text style={styles.buttonText}>注册</Text>
          }
        </TouchableOpacity>
      </View>
    );

    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView
          keyboardVerticalOffset={keyboardVerticalOffset}
          behavior="padding"
          style={styles.container}
        >
          <ScrollView
            keyboardShouldPersistTaps={'always'}
          >
            {children}
          </ScrollView>
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

RegisterView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  values: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  resetAuth: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
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
    borderColor: palette.mint3,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: palette.white,
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
    backgroundColor: palette.mint3,
  },
  buttonText: {
    color: palette.white,
  },
});

export default RegisterView;
