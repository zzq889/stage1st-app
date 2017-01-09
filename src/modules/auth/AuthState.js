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
  token: null,
});

// Actions
export const LOGIN = createRequestTypes('LOGIN');
export const USER_AUTH = 'AuthState/USER_AUTH';
export const USER_LOGOUT = 'AuthState/USER_LOGOUT';

export const loginEntity = {
  request: () => createAction(
    LOGIN.REQUEST),
  success: (_, response) => createAction(
    LOGIN.SUCCESS, { response }),
  failure: (_, error) => createAction(
    LOGIN.FAILURE, { error }),
};

export const userAuth = (data, requiredFields = []) =>
  createAction(USER_AUTH, { data, requiredFields });

export const userLogout = () => createAction(USER_LOGOUT);

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const loginRequest = fetchEntity.bind(null, loginEntity, apiUserLogin);

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchUserAuth() {
  while (true) {
    const { data } = yield take(USER_AUTH);
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
        .set('currentUser', Map({ uid, username }))
        .set('token', sid);
    }
    case USER_LOGOUT:
    case LOGIN.FAILURE:
      if (action.error) {
        console.warn(action.error);
      }
      return initialState;
    default:
      return state;
  }
}
