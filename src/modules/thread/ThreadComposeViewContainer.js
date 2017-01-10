import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavigationStyles } from '@exponent/ex-navigation';
import ThreadComposeView from './ThreadComposeView';
import DismissButton from '../../components/DismissButton';
import { palette } from '../../styles/config';
import { newThread } from './ThreadState';

class ThreadComposeViewContainer extends PureComponent {
  static route = {
    navigationBar: {
      title: ({ title }) => title || '发布主题',
      backgroundColor: palette.black,
      tintColor: palette.inverted,
      renderLeft: () => <DismissButton />,
    },
    styles: {
      ...NavigationStyles.SlideVertical,
      gestures: null,
    },
  }

  render() {
    return (
      <ThreadComposeView
        onSubmit={data => this.props.newThread(
          data.set('fid', this.props.fid).toJS(),
        )}
        {...this.props}
      />
    );
  }
}

ThreadComposeViewContainer.propTypes = {
  fid: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  newThread: PropTypes.func.isRequired,
};

export default connect(
  () => ({}),
  {
    newThread,
  },
)(ThreadComposeViewContainer);
