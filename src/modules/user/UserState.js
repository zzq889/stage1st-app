import { take, call } from 'redux-saga/effects';
import { createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchEntity,
  fetchUserInfo as apiFetchUserInfo,
  userSign as apiUserSign,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const USER = createRequestTypes('USER');
export const USER_SIGN_REQ = createRequestTypes('USER_SIGN_REQ');
export const LOAD_USER_PAGE = 'UserState/LOAD_USER_PAGE';
export const USER_SIGN = 'UserState/USER_SIGN';

export const userEntity = {
  request: uid => createAction(
    USER.REQUEST, { uid }),
  success: (uid, response) => createAction(
    USER.SUCCESS, { uid, response }),
  failure: (uid, error) => createAction(
    USER.FAILURE, { uid, error }),
};

export const userSignEntity = {
  request: uid => createAction(
    USER_SIGN_REQ.REQUEST, { uid }),
  success: (uid, response) => createAction(
    USER_SIGN_REQ.SUCCESS, { uid, response }),
  failure: (uid, error) => createAction(
    USER_SIGN_REQ.FAILURE, { uid, error }),
};

export const loadUserPage = (uid, requiredFields = []) =>
  createAction(LOAD_USER_PAGE, { uid, requiredFields });

export const userSign = (uid, requiredFields = []) =>
  createAction(USER_SIGN, { uid, requiredFields });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const fetchUserInfo = fetchEntity.bind(null, userEntity, apiFetchUserInfo);
const postUserSign = fetchEntity.bind(null, userSignEntity, apiUserSign);

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadUserPage() {
  while (true) {
    const { uid } = yield take(LOAD_USER_PAGE);
    yield call(fetchUserInfo, uid);
  }
}

export function* watchUserSign() {
  while (true) {
    const { uid } = yield take(USER_SIGN);
    yield call(postUserSign, uid);
  }
}
