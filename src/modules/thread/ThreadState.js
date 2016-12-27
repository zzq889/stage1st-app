import { take, call, fork, select } from 'redux-saga/effects';
import uuid from 'uuid';
import { createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchEntity,
  fetchThreads as apiFetchThreads,
  fetchFavedThreads as apiFetchFavedThreads,
  fetchSubscribedThreads as apiFetchSubscribedThreads,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const THREAD = createRequestTypes('THREAD');
export const LOAD_THREAD_PAGE = 'ThreadState/LOAD_THREAD_PAGE';
export const LOAD_FAVED_THREAD_PAGE = 'ThreadState/LOAD_FAVED_THREAD_PAGE';
export const LOAD_SUBSCRIBED_THREAD_PAGE = 'ThreadState/LOAD_SUBSCRIBED_THREAD_PAGE';

export const threadEntity = {
  request: id => createAction(
    THREAD.REQUEST, { id }),
  success: (id, response) => createAction(
    THREAD.SUCCESS, { id, response }),
  failure: (id, error) => createAction(
    THREAD.FAILURE, { id, error, eid: uuid() }),
};

export const loadThreadPage = (fid, requiredFields = []) =>
  createAction(LOAD_THREAD_PAGE, { fid, requiredFields });

export const loadFavedThreadPage = (requiredFields = []) =>
  createAction(LOAD_FAVED_THREAD_PAGE, { id: 'fav', requiredFields });

export const loadSubscribedThreadPage = (requiredFields = []) =>
  createAction(LOAD_SUBSCRIBED_THREAD_PAGE, { id: 'subscribed', requiredFields });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const getThreads = (state, id) => state.getIn(['pagination', 'threadsById', id]);
const fetchThreads = fetchEntity.bind(null, threadEntity, apiFetchThreads);
const fetchFavedThreads = fetchEntity.bind(null, threadEntity, apiFetchFavedThreads);
const fetchSubscribedThreads = fetchEntity.bind(null, threadEntity, apiFetchSubscribedThreads);

// load repo unless it is cached
function* loadThreads(fid, requiredFields) {
  const threads = yield select(getThreads, fid);
  if (!threads || !threads.get('ids').size || requiredFields.some(key => !threads.has(key))) {
    yield call(fetchThreads, fid);
  }
}

function* loadFavedThreads(id, requiredFields) {
  const threads = yield select(getThreads, id);
  if (!threads || !threads.get('ids').size || requiredFields.some(key => !threads.has(key))) {
    yield call(fetchFavedThreads, id);
  }
}

function* loadSubscribedThreads(id, requiredFields) {
  const threads = yield select(getThreads, id);
  if (!threads || !threads.get('ids').size || requiredFields.some(key => !threads.has(key))) {
    yield call(fetchSubscribedThreads, id);
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadThreadPage() {
  while (true) {
    const { fid, requiredFields = [] } = yield take(LOAD_THREAD_PAGE);
    yield fork(loadThreads, fid, requiredFields);
  }
}

export function* watchLoadFavedThreadPage() {
  while (true) {
    const { id, requiredFields = [] } = yield take(LOAD_FAVED_THREAD_PAGE);
    yield fork(loadFavedThreads, id, requiredFields);
  }
}

export function* watchLoadSubscribedThreadPage() {
  while (true) {
    const { id, requiredFields = [] } = yield take(LOAD_SUBSCRIBED_THREAD_PAGE);
    yield fork(loadSubscribedThreads, id, requiredFields);
  }
}
