import { Provider } from 'react-redux';
import React from 'react';
import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';

const DemoApp = codePush(() => (
  <Provider store={store}>
    <AppViewContainer />
  </Provider>
));

AppRegistry.registerComponent('DemoApp', () => DemoApp);
