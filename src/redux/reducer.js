import { fromJS } from 'immutable';
import { loop } from 'redux-loop';
import { NavigationReducer } from '@exponent/ex-navigation';
import immutableReducers from '../utils/immutableReducers';
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

const namespacedReducer = immutableReducers(
  reducers,
);

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || undefined, action);

  // enforce the state is immutable
  return loop(fromJS(nextState), effects);
}
