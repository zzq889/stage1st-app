import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import withMessage from '../error/withMessage';
import { palette } from '../../styles/config';
import ThreadListViewContainer from '../thread/ThreadListViewContainer';

const titles = {
  thread: '帖子',
  post: '回复',
};

@withMessage
export default class HistoryTabView extends Component {
  static route = {
    navigationBar: {
      title: '我的发言',
    },
  }

  _renderLabel = ({ route }) => {
    const title = titles[route.key];
    return <Text style={styles.tabLabel}>{title}</Text>;
  };

  render() {
    return (
      <ScrollableTabView
        style={styles.container}
        tabBarUnderlineStyle={{ height: 2, backgroundColor: palette.primary }}
        tabBarTextStyle={{ fontSize: 15 }}
        tabBarActiveTextColor={palette.primary}
        tabBarInactiveTextColor={palette.default}
        tabBarBackgroundColor={palette.toolbar}
      >
        <ThreadListViewContainer fid="history" tabLabel="我的帖子" />
        <Text tabLabel="我的回复">My Posts</Text>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  tabLabel: {
    margin: 8,
    fontSize: 13,
    color: palette.foreground,
  },

  tabIndicator: {
    backgroundColor: palette.primary,
  },
});
