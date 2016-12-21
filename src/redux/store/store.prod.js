import { applyMiddleware, createStore, compose } from 'redux';
import { createNavigationEnabledStore } from '@exponent/ex-navigation';
import { install as installReduxLoop } from 'redux-loop';
import createSagaMiddleware, { END } from 'redux-saga';
import middleware from '../middleware';
import reducer from '../reducer';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(
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

store.close = () => store.dispatch(END);
sagaMiddleware.run(rootSaga);

export default store;
