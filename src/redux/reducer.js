import { combineReducers } from 'redux-immutable';
import { NavigationReducer } from '@exponent/ex-navigation';
import { reducer as FormReducer } from 'redux-form/immutable';
import SessionStateReducer from '../modules/session/SessionState';
import ErrorStateReducer from '../modules/error/ErrorState';
import EntitiesStateReducer from '../modules/entities/EntitiesState';
import PaginationStateReducer from '../modules/pagination/PaginationState';
import AuthStateReducer from '../modules/auth/AuthState';
import PostStateReducer from '../modules/post/PostState';

// after reducer changes, don't forget to update the persist policy in store.js
export default combineReducers({
  // @NOTE: By convention, the navigation state must live in a subtree called
  // `navigation`
  navigation: NavigationReducer,
  form: FormReducer,
  session: SessionStateReducer,
  error: ErrorStateReducer,

  // persist
  entities: EntitiesStateReducer,
  pagination: PaginationStateReducer,
  auth: AuthStateReducer,
  post: PostStateReducer,

  // others
});
