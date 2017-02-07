import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { palette } from '../../styles/config';
import NotificationsViewContainer from './NotificationsViewContainer';


const NotificationTabView = props => (
  <ScrollableTabView
    style={styles.container}
    tabBarUnderlineStyle={{ height: 2, backgroundColor: palette.primary }}
    tabBarTextStyle={{ fontSize: 15 }}
    tabBarActiveTextColor={palette.primary}
    tabBarInactiveTextColor={palette.default}
    tabBarBackgroundColor={palette.toolbar}
  >
    <NotificationsViewContainer type="reply" tabLabel="回复我的" {...props} />
    <NotificationsViewContainer type="at" tabLabel="@我的" {...props} />
  </ScrollableTabView>
);

export default NotificationTabView;

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
