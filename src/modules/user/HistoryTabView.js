import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import {
  SlidingTabNavigation,
  SlidingTabNavigationItem,
} from '@exponent/ex-navigation';
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
      ...SlidingTabNavigation.navigationBarStyles,
    },
  }

  _renderLabel = ({ route }) => {
    const title = titles[route.key];
    return <Text style={styles.tabLabel}>{title}</Text>;
  };

  render() {
    return (
      <SlidingTabNavigation
        id="history"
        navigatorUID="history"
        renderLabel={this._renderLabel}
        barBackgroundColor="#ddd"
        indicatorStyle={styles.tabIndicator}
        lazy // Hack: the lazy property must be required for ListView
      >
        <SlidingTabNavigationItem id="thread">
          <ThreadListViewContainer fid="history" />
        </SlidingTabNavigationItem>
        <SlidingTabNavigationItem id="post">
          <Text>My Posts</Text>
        </SlidingTabNavigationItem>
      </SlidingTabNavigation>
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
