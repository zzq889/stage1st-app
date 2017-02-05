/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import ColorViewContainer from '../colors/ColorViewContainer';
import { header, palette, gestureResponseDistance } from '../../styles/config';

export const MainTab = StackNavigator({
  Color: {
    screen: ColorViewContainer,
    path: '/',
  },
}, {
  navigationOptions: { header },
});

export const AppNavigator = TabNavigator({
  MainTab: {
    screen: MainTab,
    path: '/',
    navigationOptions: {
      tabBar: () => ({
        label: 'Home',
        icon: ({ focused }) => (
          <Icon
            name={focused ? 'ios-heart' : 'ios-heart-outline'}
            size={30}
            color={focused ? palette.primary : palette.default}
          />
        ),
      }),
    },
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
});

export const AppWithNavigationState = connect(state => ({
  nav: state.get('nav'),
}))(({ dispatch, nav }) => (
  <AppNavigator
    navigation={addNavigationHelpers({ dispatch, state: nav })}
    gestureResponseDistance={gestureResponseDistance}
  />
));
