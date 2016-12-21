import { NavigationReducer } from '@exponent/ex-navigation';
import { combineReducers } from 'redux-immutable';
import ErrorStateReducer from '../modules/error/ErrorState';
import EntitiesStateReducer from '../modules/entities/EntitiesState';
import PaginationStateReducer from '../modules/pagination/PaginationState';

const reducers = {
  // @NOTE: By convention, the navigation state must live in a subtree called
  // `navigation`
  // navigation: NavigationReducer,
  // errorMessage: ErrorStateReducer,
  entities: EntitiesStateReducer,
  pagination: PaginationStateReducer,
  // others
};

export default combineReducers(
  reducers,
);

// export default function mainReducer(state, action) {
//   const [nextState, effects] = action.type === RESET_STATE
//     ? namespacedReducer(action.payload, action)
//     : namespacedReducer(state || undefined, action);

//   // enforce the state is immutable
//   return loop(fromJS(nextState), effects);
// }
