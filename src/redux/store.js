import { applyMiddleware, createStore, compose } from 'redux';
import * as reduxLoop from 'redux-loop';
import { createNavigationEnabledStore } from '@exponent/ex-navigation';

import middleware from './middleware';
import reducer from './reducer';

const enhancer = compose(
  applyMiddleware(...middleware),
  reduxLoop.install(),
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
