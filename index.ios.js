/* eslint-disable react/prefer-stateless-function*/

import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';

class Stage1st extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Stage1st', () => codePush(Stage1st));
