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
import { fromJS, Map } from 'immutable';
import { palette, rounded, keyboardVerticalOffset } from '../../styles/config';
import TextField from '../../components/TextField';
import PreImage from '../../../images/pre.png';
import CircleView from '../../components/CircleView';
import DismissButton from '../../components/DismissButton';
import { authEmitter } from './AuthState';
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

class LoginView extends Component {
  static navigationOptions = {
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      left: <DismissButton navigation={navigation} />,
    }),
  }

  componentWillMount() {
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
      submitting,
      values,
      onChange,
    } = this.props;
    const disabled = invalid || submitting;
    const qid = values.get('questionid');
    const showsAnswer = qid && qid !== 0;
    const children = (
      <View style={styles.content}>
        <CircleView size={100} source={PreImage} style={styles.image} />
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
          autoFocus
          onSubmitEditing={() => { this.passField.focus(); }}
          disabled={submitting}
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
          disabled={submitting}
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
              fieldRef={(c) => { this.answerField = c; }}
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              label="请输入安全提问答案"
              type="text"
              value={values.get('answer')}
              onChangeText={val => onChange('answer', val)}
              disabled={submitting}
            />
          ) : null
        }
        <TouchableOpacity
          style={invalid ? [styles.button, styles.disabled] : styles.button}
          disabled={disabled}
          onPress={() => {
            this.nameField.blur();
            this.passField.blur();
            if (this.answerField) {
              this.answerField.blur();
            }
            onSubmit();
          }}
        >
          {
            submitting
            ? <ActivityIndicator color={palette.white} />
            : <Text style={styles.buttonText}>登录</Text>
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

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  values: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
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

export default LoginView;
