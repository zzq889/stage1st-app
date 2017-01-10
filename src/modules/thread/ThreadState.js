import { take, call } from 'redux-saga/effects';
import { EventEmitter } from 'fbemitter';
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

export const threadEmitter = new EventEmitter();

export const THREAD = createRequestTypes('THREAD');
export const THREAD_CREATION = createRequestTypes('THREAD_CREATION');
export const LOAD_THREAD_PAGE = 'ThreadState/LOAD_THREAD_PAGE';
export const LOAD_FAVED_THREAD_PAGE = 'ThreadState/LOAD_FAVED_THREAD_PAGE';
export const LOAD_SUBSCRIBED_THREAD_PAGE = 'ThreadState/LOAD_SUBSCRIBED_THREAD_PAGE';
export const NEW_THREAD = 'ThreadState/NEW_THREAD';

export const threadEntity = {
  request: fid => createAction(
    THREAD.REQUEST, { fid }),
  success: (fid, response) => createAction(
    THREAD.SUCCESS, { fid, response }),
  failure: (fid, error) => createAction(
    THREAD.FAILURE, { fid, error }),
};

export const threadCreationEntity = {
  request: args => createAction(
    THREAD_CREATION.REQUEST, { ...args }),
  success: (args, response) => createAction(
    THREAD_CREATION.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    THREAD_CREATION.FAILURE, { ...args, error }),
};

export const loadThreadPage = (fid, requiredFields = []) =>
  createAction(LOAD_THREAD_PAGE, { fid, requiredFields });

export const loadFavedThreadPage = (requiredFields = []) =>
  createAction(LOAD_FAVED_THREAD_PAGE, { fid: 'fav', requiredFields });

export const loadSubscribedThreadPage = (requiredFields = []) =>
  createAction(LOAD_SUBSCRIBED_THREAD_PAGE, { fid: 'subscribed', requiredFields });

export const newThread = (args, requiredFields = []) =>
  createAction(NEW_THREAD, { args, requiredFields });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const fetchThreads = fetchEntity.bind(null, threadEntity, apiFetchThreads);
const fetchFavedThreads = fetchEntity.bind(null, threadEntity, apiFetchFavedThreads);
const fetchSubscribedThreads = fetchEntity.bind(null, threadEntity, apiFetchSubscribedThreads);
const createThread = fetchEntity.bind(null, threadCreationEntity, apiCreateThread);

// load repo unless it is cached
// const getThreads = (state, fid) => state.getIn(['pagination', 'threadsById', fid]);

// function* loadThreads(fid, requiredFields) {
//   const threads = yield select(getThreads, fid);
//   if (!threads || !threads.get('ids').size || requiredFields.some(key => !threads.has(key))) {
//     yield call(fetchThreads, fid);
//   }
// }

// function* loadFavedThreads(id, requiredFields) {
//   const threads = yield select(getThreads, id);
//   if (!threads || !threads.get('ids').size || requiredFields.some(key => !threads.has(key))) {
//     yield call(fetchFavedThreads, id);
//   }
// }

// function* loadSubscribedThreads(id, requiredFields) {
//   const threads = yield select(getThreads, id);
//   if (!threads || !threads.get('ids').size || requiredFields.some(key => !threads.has(key))) {
//     yield call(fetchSubscribedThreads, id);
//   }
// }

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadThreadPage() {
  while (true) {
    const { fid /* , requiredFields = []*/ } = yield take(LOAD_THREAD_PAGE);
    // yield fork(loadThreads, fid, requiredFields);
    yield call(fetchThreads, fid);
  }
}

export function* watchLoadFavedThreadPage() {
  while (true) {
    const { id } = yield take(LOAD_FAVED_THREAD_PAGE);
    // yield fork(loadFavedThreads, id, requiredFields);
    yield call(fetchFavedThreads, id);
  }
}

export function* watchLoadSubscribedThreadPage() {
  while (true) {
    const { id } = yield take(LOAD_SUBSCRIBED_THREAD_PAGE);
    // yield fork(loadSubscribedThreads, id, requiredFields);
    yield call(fetchSubscribedThreads, id);
  }
}

export function* watchNewThread() {
  while (true) {
    const { args } = yield take(NEW_THREAD);
    yield call(createThread, args);
  }
}

export function* watchNewThreadSuccess() {
  while (true) {
    const { fid } = yield take(THREAD_CREATION.SUCCESS);
    threadEmitter.emit('dismissComposeView');
    yield call(fetchThreads, fid);
  }
}
