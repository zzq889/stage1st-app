import { applyMiddleware, createStore, compose } from 'redux';
import { Map } from 'immutable';
import { createNavigationEnabledStore } from '@exponent/ex-navigation';
import createSagaMiddleware, { END } from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';
import { AsyncStorage } from 'react-native';
import middleware from '../middleware';
import reducer from '../reducer';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(
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

store.close = () => store.dispatch(END);
sagaMiddleware.run(rootSaga);

persistStore(store, {
  storage: AsyncStorage,
});

export default store;
