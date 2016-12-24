/* eslint-disable global-require */

import { applyMiddleware, createStore } from 'redux';
import { Map } from 'immutable';
import { composeWithDevTools } from 'remote-redux-devtools';
import { createNavigationEnabledStore } from '@exponent/ex-navigation';
import createSagaMiddleware, { END } from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';
import { AsyncStorage } from 'react-native';
import middleware from './middleware';
import reducer from './reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({ realtime: __DEV__, port: 5678 });
const enhancer = composeEnhancers(
  autoRehydrate(),
  applyMiddleware(sagaMiddleware, ...middleware),
);

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

// create the store
const store = createStoreWithNavigation(
  reducer,
  Map(),
  enhancer,
);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducer', () => {
    const nextRootReducer = require('./reducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

store.close = () => store.dispatch(END);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store, {
  storage: AsyncStorage,
  blacklist: ['error', 'navigation'],
});

export default store;
