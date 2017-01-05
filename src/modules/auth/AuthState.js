import { take, call/* , fork, select*/ } from 'redux-saga/effects';
import { Map } from 'immutable';
import EventEmitter from 'event-emitter';
import { createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchEntity,
  userLogin as apiUserLogin,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const authEmitter = new EventEmitter();

// Initial state
const initialState = Map({
  isLoggedIn: false,
  currentUser: null,
  authenticationToken: null,
});

// Actions
export const LOGIN = createRequestTypes('LOGIN');
export const AUTH_USER = 'AuthState/AUTH_USER';

export const loginEntity = {
  request: () => createAction(
    LOGIN.REQUEST),
  success: (_, response) => createAction(
    LOGIN.SUCCESS, { response }),
  failure: (_, error) => createAction(
    LOGIN.FAILURE, { error }),
};

export const authUser = (data, requiredFields = []) =>
  createAction(AUTH_USER, { data, requiredFields });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const loginRequest = fetchEntity.bind(null, loginEntity, apiUserLogin);

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchAuthUser() {
  while (true) {
    const { data } = yield take(AUTH_USER);
    yield call(loginRequest, data);
  }
}

/** ****************************************************************************/
/** ***************************** REDUCERS *************************************/
/** ****************************************************************************/

export default function AuthStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN.SUCCESS: {
      const { uid, username, sid } = action.response.data;
      authEmitter.emit('dismiss');
      return state
        .set('isLoggedIn', true)
        .set('currentUser', { uid, username })
        .set('authenticationToken', sid);
    }
    case LOGIN.FAILURE:
      console.warn(action.error);
      return initialState;
    default:
      return state;
  }
}
