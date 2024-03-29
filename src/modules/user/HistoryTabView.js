import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { palette } from '../../styles/config';
import ThreadListViewContainer from '../thread/ThreadListViewContainer';
import PostHistoryViewContainer from '../post/PostHistoryViewContainer';

const HistoryTabView = props => (
  <ScrollableTabView
    style={styles.container}
    tabBarUnderlineStyle={{ height: 2, backgroundColor: palette.primary }}
    tabBarTextStyle={{ fontSize: 15 }}
    tabBarActiveTextColor={palette.primary}
    tabBarInactiveTextColor={palette.default}
    tabBarBackgroundColor={palette.toolbar}
  >
    <ThreadListViewContainer fid="history" tabLabel="我的帖子" {...props} />
    <PostHistoryViewContainer tabLabel="我的回复" {...props} />
  </ScrollableTabView>
);

export default HistoryTabView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.background,
  },
  tabLabel: {
    margin: 8,
    fontSize: 13,
    color: palette.foreground,
  },

  tabIndicator: {
    backgroundColor: palette.primary,
  },
});
