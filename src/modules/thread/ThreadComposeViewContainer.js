import React, { PureComponent, PropTypes } from 'react';
import { InteractionManager } from 'react-native';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationStyles } from '@exponent/ex-navigation';
import ThreadComposeView from './ThreadComposeView';
import DismissButton from '../../components/DismissButton';
import { palette } from '../../styles/config';
import { newThread, threadEmitter } from './ThreadState';
import { loadForumPage } from '../forum/ForumState';
import withMessage from '../error/withMessage';
import SubmitButton from './SubmitButton';
import formConnect from '../form/helper';
import validate from './threadValidate';

@withMessage
class ThreadComposeViewContainer extends PureComponent {
  static route = {
    navigationBar: {
      title: ({ title }) => title || '发布主题',
      backgroundColor: palette.black,
      tintColor: palette.inverted,
      renderLeft: () => <DismissButton onPress={() => { threadEmitter.emit('DISMISS_THREAD_COMPOSE'); }} />,
      renderRight: () => <SubmitButton />,
    },
    styles: {
      ...NavigationStyles.SlideVertical,
      gestures: null,
    },
  }

  componentWillMount() {
    this._subscription = threadEmitter.once('THREAD_CREATION_SUCCESS', this.dismiss);
    InteractionManager.runAfterInteractions(() => {
      this.props.loadForumPage();
    });
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
      <ThreadComposeView
        {...this.props}
      />
    );
  }
}

ThreadComposeViewContainer.propTypes = {
  loadForumPage: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  navigator: PropTypes.shape({
    pop: PropTypes.func.isRequired,
  }),
};

export default formConnect('threadComposeForm', validate)(connect(
  (state, { fid }) => {
    const typeIds = state.getIn(['entities', 'forums', String(fid), 'types'], List());
    const types = typeIds.map(typeid => state.getIn(['entities', 'types', String(typeid)]));
    return {
      typeIds,
      types,
      initialValues: {
        typeid: types.getIn([0, 'typeid']),
      },
    };
  },
  (dispatch, { fid, values }) => ({
    onSubmit: bindActionCreators(
      newThread.bind(null, values.set('fid', fid).toJS()),
      dispatch,
    ),
    loadForumPage: bindActionCreators(loadForumPage.bind(null, fid), dispatch),
  }),
)(ThreadComposeViewContainer));
