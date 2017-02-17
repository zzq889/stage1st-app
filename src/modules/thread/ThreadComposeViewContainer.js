import React, { PureComponent, PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ThreadComposeView from './ThreadComposeView';
import DismissButton from '../../components/DismissButton';
import { newThread, threadEmitter } from './ThreadState';
import SubmitButton from '../../components/SubmitButton';
import formConnect from '../form/formConnect';
import validate from './threadValidate';

const ThreadComposeButton = formConnect('threadComposeForm', validate)(SubmitButton);

class ThreadComposeViewContainer extends PureComponent {
  static navigationOptions = {
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      left: <DismissButton onPress={() => { threadEmitter.emit('DISMISS_THREAD_COMPOSE'); }} />,
      right: <ThreadComposeButton onPress={() => { threadEmitter.emit('SUBMIT_THREAD'); }} />,
    }),
  }
  componentWillMount() {
    this._subscription = threadEmitter.once('THREAD_CREATION_SUCCESS', this.dismiss);
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
    };
  },
)(ThreadComposeViewContainer));
