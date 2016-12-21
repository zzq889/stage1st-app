import { Map, fromJS } from 'immutable';
import { loop, combineReducers } from 'redux-loop';
import { NavigationReducer } from '@exponent/ex-navigation';
import SessionStateReducer, { RESET_STATE } from '../modules/session/SessionState';
import ErrorStateReducer from '../modules/error/ErrorState';
import EntitiesStateReducer from '../modules/entities/EntitiesState';
import PaginationStateReducer from '../modules/pagination/PaginationState';
import CounterStateReducer from '../modules/counter/CounterState';

const reducers = {
  // @NOTE: By convention, the navigation state must live in a subtree called
  // `navigation`
  navigation: NavigationReducer,
  session: SessionStateReducer,
  errorMessage: ErrorStateReducer,
  entities: EntitiesStateReducer,
  pagination: PaginationStateReducer,

  // others
  counter: CounterStateReducer,
};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => (child ? child.get(key) : undefined);
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable,
);

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || undefined, action);

  // enforce the state is immutable
  return loop(fromJS(nextState), effects);
}
