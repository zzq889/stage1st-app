import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, ActivityIndicator, StatusBar, Platform } from 'react-native';
import { NavigationProvider } from '@exponent/ex-navigation';
import Router from './AppRouter';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/session/SessionState';
import store from '../redux/store';
import TabScreen from '../components/TabScreen';
import DeveloperMenu from '../components/DeveloperMenu';

class AppView extends Component {
  componentDidMount() {
    snapshotUtil.resetSnapshot()
      .then((snapshot) => {
        const { dispatch } = this.props;

        if (snapshot) {
          dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
        } else {
          dispatch(SessionStateActions.initializeSessionState());
        }

        store.subscribe(() => {
          snapshotUtil.saveSnapshot(store.getState());
        });
      });
  }

  render() {
    if (!this.props.isReady) {
      return (
        <View>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <NavigationProvider router={Router}>
          <TabScreen />
        </NavigationProvider>
        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" animated />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        {__DEV__ && <DeveloperMenu />}
      </View>
    );
  }
}

AppView.propTypes = {
  isReady: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default AppView;
