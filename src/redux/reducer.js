import { NavigationReducer } from '@exponent/ex-navigation';
import { combineReducers } from 'redux-immutable';
import ErrorStateReducer from '../modules/error/ErrorState';
import EntitiesStateReducer from '../modules/entities/EntitiesState';
import PaginationStateReducer from '../modules/pagination/PaginationState';

export default combineReducers({
  // @NOTE: By convention, the navigation state must live in a subtree called
  // `navigation`
  // navigation: NavigationReducer,
  // errorMessage: ErrorStateReducer,
  entities: EntitiesStateReducer,
  pagination: PaginationStateReducer,
  // others
});
