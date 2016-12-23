import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { NavigationProvider } from '@exponent/ex-navigation';
import Router from './AppRouter';
import TabScreen from '../modules/navigation/TabScreen';
import DeveloperMenu from '../components/DeveloperMenu';

const AppView = ({ isReady }) => {
  if (!isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={styles.centered} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationProvider router={Router}>
        <TabScreen />
      </NavigationProvider>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" animated />}
      {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
      {__DEV__ && <DeveloperMenu />}
    </View>
  );
};

AppView.propTypes = {
  isReady: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centered: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default AppView;
