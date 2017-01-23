import React from 'react';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
} from '@exponent/ex-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Router from '../AppRouter';
import { defaultRouteConfig, palette } from '../../styles/config';

const TabScreen = () => (
  <TabNavigation
    id="main"
    navigatorUID="main"
    initialTab="forums"
    tabBarHeight={45}
    tabBarColor={palette.tabbar}
    tabBarStyle={{ borderTopWidth: 0 }}
  >
    <TabItem
      id="threads"
      renderIcon={isSelected => (isSelected
        ? <Icon name="ios-heart" size={30} color={palette.primary} />
        : <Icon name="ios-heart-outline" size={30} color={palette.default} />)
      }
    >
      <StackNavigation
        id="threads"
        navigatorUID="threads"
        defaultRouteConfig={defaultRouteConfig.toJS()}
        initialRoute={Router.getRoute('subscribed')}
      />
    </TabItem>

    <TabItem
      id="forums"
      renderIcon={isSelected => (isSelected
        ? <Icon name="ios-folder" size={30} color={palette.primary} />
        : <Icon name="ios-folder-outline" size={30} color={palette.default} />)
      }
    >
      <StackNavigation
        id="forums"
        navigatorUID="forums"
        defaultRouteConfig={defaultRouteConfig.toJS()}
        initialRoute={Router.getRoute('forums')}
      />
    </TabItem>

    <TabItem
      id="profile"
      renderIcon={isSelected => (isSelected
        ? <Icon name="ios-person" size={35} color={palette.primary} />
        : <Icon name="ios-person-outline" size={35} color={palette.default} />)
      }
    >
      <StackNavigation
        id="profile"
        navigatorUID="profile"
        defaultRouteConfig={defaultRouteConfig.toJS()}
        initialRoute={Router.getRoute('profile')}
      />
    </TabItem>
  </TabNavigation>
);

export default TabScreen;
