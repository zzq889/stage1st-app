import { takeEvery, call, select } from 'redux-saga/effects';
import { fetchEntity, createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchReplies as apiFetchReplies,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const NOTIFICATION = createRequestTypes('NOTIFICATION');
export const LOAD_REPLIES_PAGE = 'NotificationState/LOAD_REPLIES_PAGE';

export const notificationEntity = {
  request: args => createAction(
    NOTIFICATION.REQUEST, { ...args }),
  success: (args, response) => createAction(
    NOTIFICATION.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    NOTIFICATION.FAILURE, { ...args, error }),
};

export const loadRepliesPage = loadType =>
  createAction(LOAD_REPLIES_PAGE, { loadType });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const fetchNotifications = args => fetchEntity(notificationEntity, apiFetchReplies, args);
const getNotifications = (state, key) =>
  state.getIn(['pagination', 'notificationsByKey', key]);

function* loadReplies({ loadType }) {
  const paginationKey = 'replies';
  if (loadType === 'refresh' || loadType === 'load') {
    yield call(fetchNotifications, { paginationKey, pageNo: 1, refresh: true, loadType });
  } else {
    const notifications = yield select(getNotifications, paginationKey);
    if (!notifications || !notifications.get('ids').size || loadType === 'loadmore') {
      yield call(fetchNotifications, { paginationKey, pageNo: notifications && notifications.get('nextPage') });
    }
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadRepliesPage() {
  yield takeEvery(LOAD_REPLIES_PAGE, loadReplies);
}
