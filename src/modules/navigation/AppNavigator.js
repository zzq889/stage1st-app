/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import {
  BackAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
  TabView,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { header, palette, gestureResponseDistance } from '../../styles/config';
// import ColorViewContainer from '../colors/ColorViewContainer';
import LoginViewContainer from '../auth/LoginViewContainer';
import RegisterViewContainer from '../auth/RegisterViewContainer';
import ForumTabViewContainer from '../forum/ForumTabViewContainer';
import ThreadsTabViewContainer from '../thread/ThreadsTabViewContainer';
import ThreadListViewContainer from '../thread/ThreadListViewContainer';
import SubscribedTabViewContainer from '../thread/SubscribedTabViewContainer';
import ThreadComposeViewContainer from '../thread/ThreadComposeViewContainer';
import PostListViewContainer from '../post/PostListViewContainer';
import PostComposeViewContainer from '../post/PostComposeViewContainer';
import ProfileViewContainer from '../user/ProfileViewContainer';
import HistoryTabView from '../user/HistoryTabView';
import AboutView from '../about/AboutView';
import NotificationTabView from '../notification/NotificationTabView';
import NewsListViewContainer from '../news/NewsListViewContainer';
import ArticleViewContainer from '../news/ArticleViewContainer';
import CommentComposeViewContainer from '../news/CommentComposeViewContainer';

export const NewsTab = StackNavigator({
  News: {
    screen: NewsListViewContainer,
    path: '/news',
    navigationOptions: {
      title: '新闻',
    },
  },
  Article: {
    screen: ArticleViewContainer,
    path: '/news/:id',
    navigationOptions: {
      title: '正文',
    },
  },
}, {
  navigationOptions: { header },
});

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

export const ForumTab = StackNavigator({
  Forums: {
    screen: ForumTabViewContainer,
    path: '/',
    navigationOptions: {
      title: '论坛',
    },
  },
  Threads: {
    screen: ThreadsTabViewContainer,
    path: '/threads/:fid',
    navigationOptions: {
      title: ({ state }) => state.params.title,
    },
  },
}, {
  navigationOptions: { header },
});

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
    screen: NotificationTabView,
    path: '/notifications',
    navigationOptions: {
      title: '我的消息',
    },
  },
}, {
  navigationOptions: { header },
});

NewsTab.defaultProps = {
  gestureResponseDistance,
};

FeedTab.defaultProps = {
  gestureResponseDistance,
};

ForumTab.defaultProps = {
  gestureResponseDistance,
};

SettingsTab.defaultProps = {
  gestureResponseDistance,
};

export const TabScreen = TabNavigator({
  NewsTab: {
    screen: NewsTab,
    path: '/news',
    navigationOptions: {
      tabBar: () => ({
        label: '新闻',
        icon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-paper' : 'ios-paper-outline'}
            size={30}
            color={focused ? tintColor : palette.default}
          />
        ),
      }),
    },
  },
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
  tabBarComponent: TabView.TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: palette.primary,
    style: {
      backgroundColor: palette.tabbar,
    },
    indicatorStyle: {
      backgroundColor: 'transparent',
    },
  },
});

export const MasterNavigator = StackNavigator({
  Master: {
    screen: TabScreen,
    path: '/',
  },
  Posts: {
    screen: PostListViewContainer,
    path: '/posts/:tid',
    navigationOptions: {
      title: 'Posts',
      header,
    },
  },
}, {
  headerMode: 'screen',
  navigationOptions: {
    header: {
      visible: false,
    },
  },
});

MasterNavigator.defaultProps = {
  gestureResponseDistance,
};

export const AppNavigator = StackNavigator({
  Default: {
    screen: MasterNavigator,
    path: '/',
  },
  Login: {
    screen: LoginViewContainer,
    path: 'login',
    navigationOptions: {
      title: '登录',
      header,
    },
  },
  Register: {
    screen: RegisterViewContainer,
    path: '/register',
    navigationOptions: {
      title: '注册',
      header,
    },
  },
  NewThread: {
    screen: ThreadComposeViewContainer,
    path: '/newThread/:fid',
    navigationOptions: {
      title: '发布主题',
      header,
    },
  },
  NewComment: {
    screen: CommentComposeViewContainer,
    path: '/post/:postId/write_comment',
    navigationOptions: {
      title: '写留言',
      header,
    },
  },
  Reply: {
    screen: PostComposeViewContainer,
    path: '/reply/:tid/:pid',
    navigationOptions: {
      title: '回复',
      header,
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

@connect(state => ({
  nav: state.get('nav'),
}))
@connect(
  () => ({}),
  (dispatch, { nav }) => ({
    navigation: addNavigationHelpers({ dispatch, state: nav }),
  }),
)
export class AppWithNavigationState extends Component {
  componentDidMount() {
    this._listener = BackAndroid.addEventListener('hardwareBackPress', () => {
      if (!this.onMainScreen()) {
        this.props.navigation.goBack(null);
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    this._listener.remove();
  }

  onMainScreen = () => {
    // warning: ugly hack
    const state = this.props.navigation.state;
    if (state.index === 0) {
      const state2 = state.routes[0];
      if (state2.index === 0) {
        const routeValue = state2.routes[0].routes.reduce((sum, route) => sum + route.index, 0);
        return routeValue === 0;
      }
    }
    return false;
  }

  render() {
    const { navigation } = this.props;
    return (
      <AppNavigator
        navigation={navigation}
        gestureResponseDistance={gestureResponseDistance}
      />
    );
  }
}
