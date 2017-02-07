import { takeEvery, call, select } from 'redux-saga/effects';
import { fetchEntity, createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchNotifications as apiFetchNotifications,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const NOTIFICATION = createRequestTypes('NOTIFICATION');
export const LOAD_NOTIFICATIONS_PAGE = 'NotificationState/LOAD_NOTIFICATIONS_PAGE';

export const notificationEntity = {
  request: args => createAction(
    NOTIFICATION.REQUEST, { ...args }),
  success: (args, response) => createAction(
    NOTIFICATION.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    NOTIFICATION.FAILURE, { ...args, error }),
};

export const loadNotificationsPage = (notificationType, loadType) =>
  createAction(LOAD_NOTIFICATIONS_PAGE, { notificationType, loadType });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const fetchNotifications = args => fetchEntity(notificationEntity, apiFetchNotifications, args);
const getNotifications = (state, key) =>
  state.getIn(['pagination', 'notificationsByKey', key]);

function* loadNotifications({ notificationType, loadType }) {
  const paginationKey = notificationType;
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

export function* watchLoadNotificationsPage() {
  yield takeEvery(LOAD_NOTIFICATIONS_PAGE, loadNotifications);
}
