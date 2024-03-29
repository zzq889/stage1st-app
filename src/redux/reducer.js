import { combineReducers } from 'redux-immutable';
import NavigationStateReducer from '../modules/navigation/NavigationState';
import SessionStateReducer from '../modules/session/SessionState';
import ErrorStateReducer from '../modules/error/ErrorState';
import EntitiesStateReducer from '../modules/entities/EntitiesState';
import PaginationStateReducer from '../modules/pagination/PaginationState';
import AuthStateReducer from '../modules/auth/AuthState';
import PostStateReducer from '../modules/post/PostState';
import ForumStateReducer from '../modules/forum/ForumState';
import FormStateReducer from '../modules/form/FormState';

// after reducer changes, don't forget to update the persist policy in store.js
export default combineReducers({
  // @NOTE: By convention, the navigation state must live in a subtree called
  // `navigation`
  nav: NavigationStateReducer,
  form: FormStateReducer,
  session: SessionStateReducer,
  error: ErrorStateReducer,

  // persist
  entities: EntitiesStateReducer,
  pagination: PaginationStateReducer,
  auth: AuthStateReducer,
  post: PostStateReducer,
  forum: ForumStateReducer,

  // others
});
