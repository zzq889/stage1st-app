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
import { connectActionSheet } from '@exponent/react-native-action-sheet';
import { palette, keyboardVerticalOffset } from '../../styles/config';
import TextField from '../../components/TextField';
import Picker from '../../components/Picker';
import { threadEmitter } from './ThreadState';

const CHAR_LIMIT = 80;

@connectActionSheet
class ThreadComposeView extends Component {
  state = {
    isExpand: false,
  }

  componentWillMount() {
    this.initialize(this.props, true);
    this._dismiss = threadEmitter.addListener('DISMISS_THREAD_COMPOSE', this.showActionSheet);
    this._submit = threadEmitter.addListener('SUBMIT_THREAD', () => this.props.onSubmit());
  }

  componentWillReceiveProps(nextProps) {
    this.initialize(nextProps);
  }

  componentWillUnmount() {
    this._dismiss.remove();
    this._submit.remove();
  }

  initialize = (props, always) => {
    // initial value
    const typeid = props.values.get('typeid');
    if (always || (!typeid && this.props.initialValues.typeid !== props.initialValues.typeid)) {
      this.props.onChange('typeid', props.initialValues.typeid);
    }
  }

  showActionSheet = () => {
    const title = this.props.values.get('title') || '';
    const content = this.props.values.get('content') || '';
    if (title === '' && content === '') {
      this.props.navigator.pop();
    } else {
      this.titleField.blur();
      this.contentField.blur();
      const options = ['删除', '保存', '取消'];
      const destructiveButtonIndex = 0;
      const cancelButtonIndex = 2;
      this.props.showActionSheetWithOptions({
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.props.reset();
          this.props.navigator.pop();
        } else if (buttonIndex === 1) {
          this.props.navigator.pop();
        }
      });
    }
  }


  render() {
    const { types } = this.props;
    const title = this.props.values.get('title', '');
    const typeid = this.props.values.get('typeid');
    const content = this.props.values.get('content', '');
    const charLeft = CHAR_LIMIT - unescape(encodeURIComponent(title)).length;
    const children = (
      <View style={styles.container}>
        <View style={styles.row}>
          <TextField
            fieldRef={(c) => { this.titleField = c; }}
            style={styles.container}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            clearButtonMode="while-editing"
            name="title"
            value={title}
            onChangeText={val => this.props.onChange('title', val)}
            type="text"
            label="请输入标题"
            autoFocus
          />
          <Text style={charLeft < 0 ? [styles.counter, styles.counterError] : styles.counter}>
            {charLeft}
          </Text>
        </View>
        <View style={styles.separator} />
        <Picker
          name="typeid"
          value={typeid}
          onChange={val => this.props.onChange('typeid', val)}
          isExpand={this.state.isExpand}
          toggleExpand={() => { this.setState({ isExpand: !this.state.isExpand }); }}
          items={types.map(type => Map({ label: type.get('type'), value: type.get('typeid') }))}
          label="主题分类"
        />
        <View style={styles.separator} />
        <TextField
          fieldRef={(c) => { this.contentField = c; }}
          style={styles.textarea}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          multiline
          name="content"
          value={content}
          onChangeText={val => this.props.onChange('content', val)}
          type="text"
          label="请输入正文"
        />
      </View>
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
    return children;
  }
}

ThreadComposeView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  types: PropTypes.instanceOf(List),
  values: PropTypes.instanceOf(Map),
  onChange: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    typeid: PropTypes.number,
  }).isRequired,
  reset: PropTypes.func.isRequired,
  navigator: PropTypes.shape({
    pop: PropTypes.func.isRequired,
  }),
  showActionSheetWithOptions: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
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

export default ThreadComposeView;
