import React, { PropTypes } from 'react';
import {
  NavigationExperimental,
  StyleSheet,
  View,
} from 'react-native';
import TabBarButton from '../components/TabBarButton';

const { PropTypes: NavigationPropTypes } = NavigationExperimental;

const TabBar = ({
  tabs,
  height,
  currentTabIndex,
  switchTab,
}) => (
  <View style={[styles.navigationBar, { height }]}>
    {tabs.routes.map((route, index) => (
      <TabBarButton
        key={`tab-bar-button-${route.key}`}
        text={route.title}
        action={() => switchTab(index)}
        isSelected={index === currentTabIndex}
      />
    ))}
  </View>
);

TabBar.propTypes = {
  tabs: NavigationPropTypes.navigationState.isRequired,
  height: PropTypes.number.isRequired,
  currentTabIndex: PropTypes.number.isRequired,
  switchTab: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  navigationBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonWrapper: {
    flex: 1,
    position: 'relative',
  },
});

export default TabBar;
