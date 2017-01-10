import { take, call, fork, select } from 'redux-saga/effects';
import { createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchEntity,
  fetchThreads as apiFetchThreads,
  fetchFavedThreads as apiFetchFavedThreads,
  fetchSubscribedThreads as apiFetchSubscribedThreads,
  createThread as apiCreateThread,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const THREAD = createRequestTypes('THREAD');
export const THREAD_CREATION = createRequestTypes('THREAD_CREATION');
export const LOAD_THREAD_PAGE = 'ThreadState/LOAD_THREAD_PAGE';
export const LOAD_FAVED_THREAD_PAGE = 'ThreadState/LOAD_FAVED_THREAD_PAGE';
export const LOAD_SUBSCRIBED_THREAD_PAGE = 'ThreadState/LOAD_SUBSCRIBED_THREAD_PAGE';
export const NEW_THREAD = 'ThreadState/NEW_THREAD';

export const threadEntity = {
  request: id => createAction(
    THREAD.REQUEST, { id }),
  success: (id, response) => createAction(
    THREAD.SUCCESS, { id, response }),
  failure: (id, error) => createAction(
    THREAD.FAILURE, { id, error }),
};

export const threadCreationEntity = {
  request: id => createAction(
    THREAD_CREATION.REQUEST, { id }),
  success: (id, response) => createAction(
    THREAD_CREATION.SUCCESS, { id, response }),
  failure: (id, error) => createAction(
    THREAD_CREATION.FAILURE, { id, error }),
};

export const loadThreadPage = (fid, requiredFields = []) =>
  createAction(LOAD_THREAD_PAGE, { fid, requiredFields });

export const loadFavedThreadPage = (requiredFields = []) =>
  createAction(LOAD_FAVED_THREAD_PAGE, { id: 'fav', requiredFields });

export const loadSubscribedThreadPage = (requiredFields = []) =>
  createAction(LOAD_SUBSCRIBED_THREAD_PAGE, { id: 'subscribed', requiredFields });

export const newThread = (args, requiredFields = []) =>
  createAction(NEW_THREAD, { args, requiredFields });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const getThreads = (state, id) => state.getIn(['pagination', 'threadsById', id]);
const fetchThreads = fetchEntity.bind(null, threadEntity, apiFetchThreads);
const fetchFavedThreads = fetchEntity.bind(null, threadEntity, apiFetchFavedThreads);
const fetchSubscribedThreads = fetchEntity.bind(null, threadEntity, apiFetchSubscribedThreads);
const createThread = fetchEntity.bind(null, threadCreationEntity, apiCreateThread);

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

export function* watchNewThread() {
  while (true) {
    const { args, requiredFields } = yield take(NEW_THREAD);
    yield call(createThread, args, requiredFields);
  }
}
