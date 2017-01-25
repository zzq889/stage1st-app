import React, { PropTypes, Component } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { fromJS, Map } from 'immutable';
import { NavigationStyles } from '@exponent/ex-navigation';
import { palette, rounded, keyboardVerticalOffset } from '../../styles/config';
import TextField from '../../components/TextField';
import PreImage from '../../../images/pre.png';
import CircleView from '../../components/CircleView';
import DismissButton from '../../components/DismissButton';
import { authEmitter } from './AuthState';
import withMessage from '../error/withMessage';
import QuestionPicker from './QuestionPicker';

const questions = fromJS([
  '安全提问(未设置请忽略)',
  '母亲的名字',
  '爷爷的名字',
  '父亲出生的城市',
  '您其中一位老师的名字',
  '您个人计算机的型号',
  '您最喜欢的餐馆名称',
  '驾驶执照最后四位数字',
]);

@withMessage
class LoginView extends Component {
  static route = {
    navigationBar: {
      title: '登录',
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
      invalid,
      submitting,
      values,
      onChange,
    } = this.props;
    const disabled = invalid || submitting;
    const qid = values.get('questionid');
    const showsAnswer = qid && qid !== 0;
    const children = (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps
      >
        <CircleView size={100} source={PreImage} style={styles.image} />
        <TextField
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          clearButtonMode="while-editing"
          label="用户名"
          type="text"
          value={values.get('username')}
          onChangeText={val => onChange('username', val)}
          autoFocus
          onSubmitEditing={() => { this.passField.focus(); }}
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
        />
        <QuestionPicker
          style={styles.input}
          items={questions}
          selectedValue={qid}
          onValueChange={val => onChange('questionid', val)}
        />
        {
          showsAnswer
          ? (
            <TextField
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              label="请输入安全提问答案"
              type="text"
              value={values.get('answer')}
              onChangeText={val => onChange('answer', val)}
            />
          ) : null
        }
        <TouchableOpacity
          style={disabled ? [styles.button, styles.disabled] : styles.button}
          disabled={disabled}
          onPress={() => onSubmit()}
        >
          <Text style={styles.buttonText}>登录</Text>
        </TouchableOpacity>
      </ScrollView>
    );

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
}

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
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

export default LoginView;
