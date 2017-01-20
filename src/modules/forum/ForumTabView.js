import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import {
  View,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ForumListViewContainer from './ForumListViewContainer';
import withMessage from '../error/withMessage';

@withMessage
export default class ForumTabView extends Component {
  static route = {
    navigationBar: {
      title: '论坛',
    },
  }

  componentWillMount() {
    this.props.loadChannelPage();
  }

  render() {
    const { channels } = this.props;

    if (channels.size < 2) {
      return <View />;
    }

    const channelsElement = channels.toList().map((chan) => {
      const key = String(chan.get('fid'));
      const name = chan.get('name');
      return (
        <ForumListViewContainer
          key={key}
          forumIds={chan.get('child')}
          tabLabel={name}
        />
      );
    });

    return (
      <ScrollableTabView>
        {channelsElement}
      </ScrollableTabView>
    );
  }
}

ForumTabView.propTypes = {
  channels: PropTypes.instanceOf(Map).isRequired,
  loadChannelPage: PropTypes.func.isRequired,
};
