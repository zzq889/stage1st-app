import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  NavigationProvider,
} from '@exponent/ex-navigation';
import { ActionSheetProvider } from '@exponent/react-native-action-sheet';
import { AppWithNavigationState } from './navigation/AppNavigator';
import Router from './AppRouter';
import DeveloperMenu from '../components/DeveloperMenu';
import { palette } from '../styles/config';

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
      <ActionSheetProvider>
        <NavigationProvider router={Router}>
          <AppWithNavigationState />
        </NavigationProvider>
      </ActionSheetProvider>
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
    backgroundColor: palette.background,
  },

  centered: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default AppView;
