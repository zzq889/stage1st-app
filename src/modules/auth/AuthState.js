import { put, call, takeEvery } from 'redux-saga/effects';
import { Map } from 'immutable';
import { EventEmitter } from 'fbemitter';
import * as Keychain from 'react-native-keychain';
import { createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  userLogin as apiUserLogin,
} from '../../services/webApi';
import { USER, USER_SIGN_REQ } from '../user/UserState';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const authEmitter = new EventEmitter();

// Actions
export const LOGIN = createRequestTypes('LOGIN');
export const USER_AUTH = 'AuthState/USER_AUTH';
export const USER_LOGOUT = 'AuthState/USER_LOGOUT';
export const RESET_AUTH = 'AuthState/RESET_AUTH';

export const loginEntity = {
  request: args => createAction(
    LOGIN.REQUEST, args),
  success: (args, response) => createAction(
    LOGIN.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    LOGIN.FAILURE, { ...args, error }),
};

export const userAuth = args =>
  createAction(USER_AUTH, { ...args });

export const userLogout = () => createAction(USER_LOGOUT);
export const resetAuth = () => createAction(RESET_AUTH);

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

function savePassword(username, password) {
  return Keychain.setGenericPassword(username, password);
}

export async function readPassword() {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials;
  } catch (error) {
    console.warn('Keychain couldn\'t be accessed! Maybe no value set?', error);
    throw error;
  }
}

function* loginRequest({ username, password, questionid, answer }) {
  const args = { username, password, questionid, answer };
  const entity = loginEntity;
  const apiFn = apiUserLogin;
  try {
    yield put(entity.request(args));
    const response = yield call(apiFn, args);
    yield put(entity.success(args, response));
    yield call(savePassword, username, password);
    authEmitter.emit('LOGIN.SUCCESS');
  } catch (error) {
    const message = error.message || 'Something bad happened';
    // console.warn(message);
    yield put(entity.failure(args, message));
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchUserAuth() {
  yield takeEvery(USER_AUTH, loginRequest);
}

/** ****************************************************************************/
/** ***************************** REDUCERS *************************************/
/** ****************************************************************************/

// Initial state
const initialState = Map({
  // login
  isLoggedIn: false,
  isSubmitting: false,
  currentUser: null,
  token: null,
  // TODO: rename sign
  isSigned: false,
  isSigning: false,
});

export default function AuthStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN.REQUEST:
      return state.set('isSubmitting', true);
    case LOGIN.SUCCESS: {
      const { uid, username, sid } = action.response.data;
      return state
        .set('isLoggedIn', true)
        .set('isSubmitting', false)
        .set('currentUser', Map({ uid, username }))
        .set('token', sid);
    }
    case RESET_AUTH:
      return state.set('isSubmitting', false);
    case USER_LOGOUT:
    case LOGIN.FAILURE:
      return initialState;
    // sign status
    case USER.SUCCESS: {
      const uid = state.getIn(['currentUser', 'uid']);
      if (uid) {
        const { signed } = action.response.entities.users[uid];
        return state.set('isSigned', signed);
      }
      return state;
    }
    // signing indicator
    case USER_SIGN_REQ.REQUEST:
      return state.set('isSigning', true);
    case USER_SIGN_REQ.SUCCESS:
      return state
        .set('isSigned', true)
        .set('isSigning', false);
    case USER_SIGN_REQ.FAILURE:
      return state.set('isSigning', false);
    default:
      return state;
  }
}
