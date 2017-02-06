import React, { PureComponent, PropTypes } from 'react';
import { InteractionManager } from 'react-native';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ThreadComposeView from './ThreadComposeView';
import DismissButton from '../../components/DismissButton';
import { newThread, threadEmitter } from './ThreadState';
import { loadForumPage } from '../forum/ForumState';
import withMessage from '../error/withMessage';
import SubmitButton from './SubmitButton';
import formConnect from '../form/helper';
import validate from './threadValidate';

@withMessage
class ThreadComposeViewContainer extends PureComponent {
  static navigationOptions = {
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      left: <DismissButton onPress={() => { threadEmitter.emit('DISMISS_THREAD_COMPOSE'); }} />,
      right: <SubmitButton />,
    }),
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
    this.props.navigation.goBack(null);
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
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }),
};

export default formConnect('threadComposeForm', validate)(connect(
  (state, { navigation }) => {
    const fid = navigation.state.params.fid;
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
  (dispatch, { navigation, values }) => {
    const fid = navigation.state.params.fid;
    return {
      onSubmit: bindActionCreators(
        newThread.bind(null, values.set('fid', fid).toJS()),
        dispatch,
      ),
      loadForumPage: bindActionCreators(loadForumPage.bind(null, fid), dispatch),
    };
  },
)(ThreadComposeViewContainer));
