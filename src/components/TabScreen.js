import React from 'react';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem,
} from '@exponent/ex-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Router from '../modules/AppRouter';

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
        defaultRouteConfig={{
          navigationBar: {
            backgroundColor: '#000',
            tintColor: '#fff',
          },
        }}
        initialRoute={Router.getRoute('counter')}
      />
    </TabItem>

    <TabItem
      id="posts"
      renderIcon={isSelected => (isSelected
        ? <Icon name="ios-star" size={30} color="#000" />
        : <Icon name="ios-star-outline" size={30} color="#000" />)
      }
    >
      <StackNavigation
        id="posts"
        initialRoute={Router.getRoute('color')}
      />
    </TabItem>
  </TabNavigation>
);

export default TabScreen;
