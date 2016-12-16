import { Provider } from 'react-redux';
import React from 'react';
import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';

const Stage1st = codePush(() => (
  <Provider store={store}>
    <AppViewContainer />
  </Provider>
));

AppRegistry.registerComponent('Stage1st', () => Stage1st);
