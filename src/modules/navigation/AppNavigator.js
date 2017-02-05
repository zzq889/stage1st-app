/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { header, palette, gestureResponseDistance } from '../../styles/config';
// import ColorViewContainer from '../colors/ColorViewContainer';
import LoginViewContainer from '../auth/LoginViewContainer';
import ForumTabViewContainer from '../forum/ForumTabViewContainer';
import ThreadListViewContainer from '../thread/ThreadListViewContainer';
import SubscribedTabViewContainer from '../thread/SubscribedTabViewContainer';
import ThreadComposeViewContainer from '../thread/ThreadComposeViewContainer';
import PostListViewContainer from '../post/PostListViewContainer';
import PostComposeViewContainer from '../post/PostComposeViewContainer';
import ProfileViewContainer from '../user/ProfileViewContainer';
import HistoryTabView from '../user/HistoryTabView';
import AboutView from '../about/AboutView';
import RepliesViewContainer from '../notification/RepliesViewContainer';

export const FeedTab = StackNavigator({
  Subscribed: {
    screen: SubscribedTabViewContainer,
    path: '/subscribed',
    navigationOptions: {
      title: '订阅',
    },
  },
}, {
  navigationOptions: { header },
});

FeedTab.defaultProps = {
  gestureResponseDistance,
};

export const ForumTab = StackNavigator({
  Forums: {
    screen: ForumTabViewContainer,
    path: '/',
    navigationOptions: {
      title: '论坛',
    },
  },
  Threads: {
    screen: ThreadListViewContainer,
    path: '/threads/:fid',
    navigationOptions: {
      title: ({ state: { params: { title } = {} } = {} }) => title,
    },
  },
}, {
  navigationOptions: { header },
});

ForumTab.defaultProps = {
  gestureResponseDistance,
};

export const SettingsTab = StackNavigator({
  Profile: {
    screen: ProfileViewContainer,
    path: '/',
    navigationOptions: {
      title: '个人',
    },
  },
  About: {
    screen: AboutView,
    path: '/about',
    navigationOptions: {
      title: '关于',
    },
  },
  History: {
    screen: HistoryTabView,
    path: '/history',
    navigationOptions: {
      title: '我的发言',
    },
  },
  MyFavorites: {
    screen: ThreadListViewContainer,
    path: '/myfavorites',
    navigationOptions: {
      title: '我的收藏',
    },
  },
  Notifications: {
    screen: RepliesViewContainer,
    path: '/notifications',
    navigationOptions: {
      title: '我的消息',
    },
  },
}, {
  navigationOptions: { header },
});

SettingsTab.defaultProps = {
  gestureResponseDistance,
};

export const TabScreen = TabNavigator({
  FeedTab: {
    screen: FeedTab,
    path: '/subscribed',
    navigationOptions: {
      tabBar: () => ({
        label: '订阅',
        icon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-heart' : 'ios-heart-outline'}
            size={30}
            color={focused ? tintColor : palette.default}
          />
        ),
      }),
    },
  },
  ForumTab: {
    screen: ForumTab,
    path: '/',
    navigationOptions: {
      tabBar: () => ({
        label: '论坛',
        icon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-folder' : 'ios-folder-outline'}
            size={30}
            color={focused ? tintColor : palette.default}
          />
        ),
      }),
    },
  },
  SettingsTab: {
    screen: SettingsTab,
    path: '/settings',
    navigationOptions: {
      tabBar: () => ({
        label: '个人',
        icon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={35}
            color={focused ? tintColor : palette.default}
          />
        ),
      }),
    },
  },
}, {
  initialRouteName: 'ForumTab',
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: palette.primary,
    style: {
      backgroundColor: palette.tabbar,
    },
  },
});

export const AppNavigator = StackNavigator({
  Master: {
    screen: TabScreen,
    path: '/',
  },
  Login: {
    screen: LoginViewContainer,
    path: '/login',
    navigationOptions: {
      title: '登录',
      header: (navigation, defaultHeader) => ({
        ...defaultHeader,
        style: {
          backgroundColor: palette.black,
        },
        tintColor: palette.inverted,
        visible: true,
      }),
    },
  },
  Posts: {
    screen: PostListViewContainer,
    path: '/posts/:tid',
    navigationOptions: {
      title: 'Posts',
      header: (navigation, defaultHeader) => ({
        ...defaultHeader,
        style: {
          backgroundColor: palette.black,
        },
        tintColor: palette.inverted,
        visible: true,
      }),
    },
  },
}, {
  mode: 'modal',
  headerMode: 'screen',
  navigationOptions: {
    header: {
      visible: false,
    },
  },
});

export const AppWithNavigationState = connect(state => ({
  nav: state.get('nav'),
}))(({ dispatch, nav }) => (
  <AppNavigator
    navigation={addNavigationHelpers({ dispatch, state: nav })}
    gestureResponseDistance={gestureResponseDistance}
  />
));
