import React, { PureComponent, PropTypes } from 'react';
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

@withMessage
class ThreadComposeViewContainer extends PureComponent {
  static route = {
    navigationBar: {
      title: ({ title }) => title || '发布主题',
      backgroundColor: palette.black,
      tintColor: palette.inverted,
      renderLeft: () => <DismissButton />,
      // renderRight: (route, props) => { console.warn(JSON.stringify(route), Object.keys(props)); },
    },
    styles: {
      ...NavigationStyles.SlideVertical,
      gestures: null,
    },
  }

  componentWillMount() {
    this.props.loadForumPage();
    threadEmitter.on('dismissComposeView', this.dismiss);
  }

  dismiss = () => {
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
  navigator: PropTypes.shape({
    pop: PropTypes.func.isRequired,
  }),
};

export default connect(
  (state, { fid }) => {
    const types = state
      .getIn(['entities', 'forums', String(fid), 'types'], List())
      .map(typeid => state.getIn(['entities', 'types', String(typeid)]));
    return {
      types,
      initialValues: {
        typeid: types.getIn([0, 'typeid']),
      },
    };
  },
  (dispatch, { fid }) => ({
    onSubmit: data => bindActionCreators(newThread, dispatch)(data.set('fid', fid).toJS()),
    loadForumPage: bindActionCreators(loadForumPage.bind(null, fid), dispatch),
  }),
)(ThreadComposeViewContainer);
