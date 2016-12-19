import React from 'react';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
} from '@exponent/ex-navigation';
import { fromJS } from 'immutable';
import Icon from 'react-native-vector-icons/Ionicons';
import Router from '../modules/AppRouter';

const defaultRouteConfig = fromJS({
  navigationBar: {
    backgroundColor: '#000',
    tintColor: '#fff',
  },
});

const TabScreen = () => (
  <TabNavigation
    id="main"
    navigatorUID="main"
    initialTab="home"
    tabBarHeight={45}
  >
    <TabItem
      id="home"
      renderIcon={isSelected => (isSelected
        ? <Icon name="ios-paper" size={30} color="#000" />
        : <Icon name="ios-paper-outline" size={30} color="#000" />)
      }
    >
      <StackNavigation
        id="home"
        defaultRouteConfig={defaultRouteConfig.toJS()}
        initialRoute={Router.getRoute('counter')}
      />
    </TabItem>

    <TabItem
      id="channel"
      renderIcon={isSelected => (isSelected
        ? <Icon name="ios-heart" size={30} color="#000" />
        : <Icon name="ios-heart-outline" size={30} color="#000" />)
      }
    >
      <StackNavigation
        id="channel"
        defaultRouteConfig={defaultRouteConfig.toJS()}
        initialRoute={Router.getRoute('color')}
      />
    </TabItem>

    <TabItem
      id="person"
      renderIcon={isSelected => (isSelected
        ? <Icon name="ios-person" size={35} color="#000" />
        : <Icon name="ios-person-outline" size={35} color="#000" />)
      }
    >
      <StackNavigation
        id="person"
        defaultRouteConfig={defaultRouteConfig.toJS()}
        initialRoute={Router.getRoute('color')}
      />
    </TabItem>
  </TabNavigation>
);

export default TabScreen;
