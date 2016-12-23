import React, { PropTypes } from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { NavigationProvider } from '@exponent/ex-navigation';
import Router from './AppRouter';
import TabScreen from '../modules/navigation/TabScreen';
import DeveloperMenu from '../components/DeveloperMenu';

const AppView = () => (
  <View style={{ flex: 1 }}>
    <NavigationProvider router={Router}>
      <TabScreen />
    </NavigationProvider>
    {Platform.OS === 'ios' && <StatusBar barStyle="light-content" animated />}
    {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
    {__DEV__ && <DeveloperMenu />}
  </View>
);

AppView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default AppView;
