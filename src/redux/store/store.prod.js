/* eslint-disable global-require */

import { applyMiddleware, createStore, compose } from 'redux';
import { createNavigationEnabledStore } from '@exponent/ex-navigation';
import { install as installReduxLoop } from 'redux-loop';
import middleware from '../middleware';
import reducer from '../reducer';

const enhancer = compose(
  applyMiddleware(...middleware),
  installReduxLoop(),
);

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

// create the store
const store = createStoreWithNavigation(
  reducer,
  null,
  enhancer,
);

export default store;
