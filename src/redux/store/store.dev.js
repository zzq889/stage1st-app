/* eslint-disable global-require, import/no-extraneous-dependencies */

import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { createNavigationEnabledStore } from '@exponent/ex-navigation';
import { install as installReduxLoop } from 'redux-loop';
import createSagaMiddleware, { END } from 'redux-saga';
import middleware from '../middleware';
import reducer from '../reducer';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({ realtime: true, port: 5678 });
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware, ...middleware),
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

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducer', () => {
    const nextRootReducer = require('../reducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

store.close = () => store.dispatch(END);
sagaMiddleware.run(rootSaga);

export default store;
