import { take, call, fork, select } from 'redux-saga/effects';
import { EventEmitter } from 'fbemitter';
import { createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchEntity,
  fetchThreads as apiFetchThreads,
  fetchFavedThreads as apiFetchFavedThreads,
  fetchSubscribedThreads as apiFetchSubscribedThreads,
  fetchThreadHistory as apiFetchThreadHistory,
  fetchThreadInfo as apiFetchThreadInfo,
  createThread as apiCreateThread,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const threadEmitter = new EventEmitter();

export const THREAD = createRequestTypes('THREAD');
export const THREAD_CREATION = createRequestTypes('THREAD_CREATION');
export const LOAD_THREAD_PAGE = 'ThreadState/LOAD_THREAD_PAGE';
export const LOAD_MORE_THREADS = 'ThreadState/LOAD_MORE_THREADS';
export const LOAD_FAVED_THREAD_PAGE = 'ThreadState/LOAD_FAVED_THREAD_PAGE';
export const LOAD_SUBSCRIBED_THREAD_PAGE = 'ThreadState/LOAD_SUBSCRIBED_THREAD_PAGE';
export const NEW_THREAD = 'ThreadState/NEW_THREAD';
export const LOAD_THREAD_INFO = 'ThreadState/LOAD_THREAD_INFO';

export const threadEntity = {
  request: args => createAction(
    THREAD.REQUEST, { ...args }),
  success: (args, response) => createAction(
    THREAD.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    THREAD.FAILURE, { ...args, error }),
};

export const threadCreationEntity = {
  request: args => createAction(
    THREAD_CREATION.REQUEST, { ...args }),
  success: (args, response) => createAction(
    THREAD_CREATION.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    THREAD_CREATION.FAILURE, { ...args, error }),
};

export const loadThreadPage = fid =>
  createAction(LOAD_THREAD_PAGE, { fid });

export const loadMoreThreads = fid =>
  createAction(LOAD_MORE_THREADS, { fid });

export const loadFavedThreadPage = fid =>
  createAction(LOAD_FAVED_THREAD_PAGE, { fid });

export const loadSubscribedThreadPage = fid =>
  createAction(LOAD_SUBSCRIBED_THREAD_PAGE, fid);

export const newThread = args =>
  createAction(NEW_THREAD, { args });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const fetchThreads = (fid) => {
  switch (fid) {
    case 'faved':
      return fetchEntity.bind(null, threadEntity, apiFetchFavedThreads);
    case 'subscribed':
      return fetchEntity.bind(null, threadEntity, apiFetchSubscribedThreads);
    case 'history':
      return fetchEntity.bind(null, threadEntity, apiFetchThreadHistory);
    default:
      return fetchEntity.bind(null, threadEntity, apiFetchThreads);
  }
};

const fetchThread = fetchEntity.bind(null, threadEntity, apiFetchThreadInfo);
const createThread = fetchEntity.bind(null, threadCreationEntity, apiCreateThread);

// load repo unless it is cached
const getThreads = (state, fid) => state.getIn(['pagination', 'threadsByFid', fid]);

function* loadThreads(fid, loadMore) {
  const threads = yield select(getThreads, fid);
  if (!threads || !threads.get('ids').size || loadMore) {
    yield call(fetchThreads(fid), { fid, pageNo: threads && threads.get('nextPage') });
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadThreadPage() {
  while (true) {
    const { fid } = yield take(LOAD_THREAD_PAGE);
    yield fork(loadThreads, fid);
  }
}

export function* watchLoadThreadInfo() {
  while (true) {
    const { tid } = yield take(LOAD_THREAD_INFO);
    yield call(fetchThread, tid);
  }
}

export function* watchLoadMoreThreads() {
  while (true) {
    const { fid } = yield take(LOAD_MORE_THREADS);
    yield fork(loadThreads, fid, true);
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
