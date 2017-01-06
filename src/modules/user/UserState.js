import { take, call } from 'redux-saga/effects';
import { createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchEntity,
  fetchUserInfo as apiFetchUserInfo,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const USER = createRequestTypes('USER');
export const LOAD_USER_PAGE = 'UserState/LOAD_USER_PAGE';

export const userEntity = {
  request: uid => createAction(
    USER.REQUEST, { uid }),
  success: (uid, response) => createAction(
    USER.SUCCESS, { uid, response }),
  failure: (uid, error) => createAction(
    USER.FAILURE, { uid, error }),
};

export const loadUserPage = (uid, requiredFields = []) =>
  createAction(LOAD_USER_PAGE, { uid, requiredFields });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const fetchUserInfo = fetchEntity.bind(null, userEntity, apiFetchUserInfo);

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadUserPage() {
  while (true) {
    const { uid } = yield take(LOAD_USER_PAGE);
    yield call(fetchUserInfo, uid);
  }
}
