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
  favThread as apiFavThread,
  createThread as apiCreateThread,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const threadEmitter = new EventEmitter();

export const THREAD = createRequestTypes('THREAD');
export const THREAD_FAV = createRequestTypes('THREAD_FAV');
export const THREAD_CREATION = createRequestTypes('THREAD_CREATION');
export const LOAD_THREAD_PAGE = 'ThreadState/LOAD_THREAD_PAGE';
export const LOAD_THREAD_INFO = 'ThreadState/LOAD_THREAD_INFO';
export const LOAD_MORE_THREADS = 'ThreadState/LOAD_MORE_THREADS';
export const NEW_THREAD = 'ThreadState/NEW_THREAD';
export const FAV_THREAD = 'ThreadState/FAV_THREAD';

export const threadEntity = {
  request: args => createAction(
    THREAD.REQUEST, { ...args }),
  success: (args, response) => createAction(
    THREAD.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    THREAD.FAILURE, { ...args, error }),
};

export const threadInfoEntity = {
  request: tid => createAction(
    THREAD.REQUEST, { tid }),
  success: (tid, response) => createAction(
    THREAD.SUCCESS, { tid, response }),
  failure: (tid, error) => createAction(
    THREAD.FAILURE, { tid, error }),
};

export const threadFavEntity = {
  request: tid => createAction(
    THREAD_FAV.REQUEST, { tid }),
  success: (tid, response) => createAction(
    THREAD_FAV.SUCCESS, { tid, response }),
  failure: (tid, error) => createAction(
    THREAD_FAV.FAILURE, { tid, error }),
};

export const threadCreationEntity = {
  request: args => createAction(
    THREAD_CREATION.REQUEST, { ...args }),
  success: (args, response) => createAction(
    THREAD_CREATION.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    THREAD_CREATION.FAILURE, { ...args, error }),
};

export const loadThreadPage = (fid, refresh, params) =>
  createAction(LOAD_THREAD_PAGE, { fid, refresh, params });

export const loadMoreThreads = (fid, params) =>
  createAction(LOAD_MORE_THREADS, { fid, params });

export const newThread = args =>
  createAction(NEW_THREAD, { ...args });

export const loadThreadInfo = tid =>
  createAction(LOAD_THREAD_INFO, { tid });

export const favThread = tid =>
  createAction(FAV_THREAD, { tid });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const fetchThreads = (fid) => {
  switch (fid) {
    case 'favorite':
      return args => fetchEntity(threadEntity, apiFetchFavedThreads, args);
    case 'subscribed':
      return args => fetchEntity(threadEntity, apiFetchSubscribedThreads, args);
    case 'history':
      return args => fetchEntity(threadEntity, apiFetchThreadHistory, args);
    default:
      return args => fetchEntity(threadEntity, apiFetchThreads, args);
  }
};

const fetchThreadInfo = args => fetchEntity(threadInfoEntity, apiFetchThreadInfo, args);
const postFavThread = args => fetchEntity(threadFavEntity, apiFavThread, args);
const createThread = args => fetchEntity(threadCreationEntity, apiCreateThread, args);

// load repo unless it is cached
const getThreads = (state, fid) => state.getIn(['pagination', 'threadsByFid', fid]);
const getSubscriptions = state => state.getIn(['forum', 'subscriptions']);

// type: ['refresh', 'loadmore', null]
function* loadThreads(fid, type) {
  const params = {};
  if (fid === 'subscribed') {
    const subscriptions = yield select(getSubscriptions);
    params.list = subscriptions && subscriptions.reduce((li, sub) => `${li},${sub}`);
  }
  if (type === 'refresh') {
    yield call(fetchThreads(fid), { fid, pageNo: 1, refresh: true, ...params });
  } else {
    const threads = yield select(getThreads, fid);
    if (!threads || !threads.get('ids').size || type === 'loadmore') {
      yield call(fetchThreads(fid), { fid, pageNo: threads && threads.get('nextPage'), ...params });
    }
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadThreadPage() {
  while (true) {
    const { fid, refresh } = yield take(LOAD_THREAD_PAGE);
    yield fork(
      loadThreads,
      fid,
      refresh ? 'refresh' : null,
    );
  }
}

export function* watchLoadThreadInfo() {
  while (true) {
    const { tid } = yield take(LOAD_THREAD_INFO);
    yield call(fetchThreadInfo, tid);
  }
}

export function* watchLoadMoreThreads() {
  while (true) {
    const { fid } = yield take(LOAD_MORE_THREADS);
    yield fork(loadThreads, fid, 'loadmore');
  }
}

export function* watchNewThread() {
  while (true) {
    const { fid, typeid, title, content } = yield take(NEW_THREAD);
    yield call(createThread, { fid, typeid, title, content });
  }
}

export function* watchFavThread() {
  while (true) {
    const { tid } = yield take(FAV_THREAD);
    yield call(postFavThread, tid);
  }
}

export function* watchNewThreadSuccess() {
  while (true) {
    const { fid } = yield take(THREAD_CREATION.REQUEST);
    threadEmitter.emit('THREAD_CREATION_SUCCESS');
    yield call(fetchThreads(fid), { fid, pageNo: 1, refresh: true });
  }
}
