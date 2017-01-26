import { takeEvery, take, call, select } from 'redux-saga/effects';
import { EventEmitter } from 'fbemitter';
import { fetchEntity, createRequestTypes, createAction } from '../../utils/actionHelper';
import {
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
  request: args => createAction(
    THREAD_FAV.REQUEST, { ...args }),
  success: (args, response) => createAction(
    THREAD_FAV.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    THREAD_FAV.FAILURE, { ...args, error }),
};

export const threadCreationEntity = {
  request: args => createAction(
    THREAD_CREATION.REQUEST, { ...args }),
  success: (args, response) => createAction(
    THREAD_CREATION.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    THREAD_CREATION.FAILURE, { ...args, error }),
};

export const loadThreadPage = (fid, loadType) =>
  createAction(LOAD_THREAD_PAGE, { fid, loadType });

export const loadMoreThreads = fid =>
  createAction(LOAD_MORE_THREADS, { fid });

export const newThread = args =>
  createAction(NEW_THREAD, { ...args });

export const loadThreadInfo = (tid, requiredFields = []) =>
  createAction(LOAD_THREAD_INFO, { tid, requiredFields });

export const favThread = (tid, fav) =>
  createAction(FAV_THREAD, { tid, fav });

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
function* loadThreads(fid, loadType) {
  const params = {};
  if (fid === 'subscribed') {
    const subscriptions = yield select(getSubscriptions);
    params.list = subscriptions && subscriptions.reduce((li, sub) => `${li},${sub}`);
  }
  if (loadType === 'refresh' || loadType === 'load') {
    yield call(fetchThreads(fid), { fid, pageNo: 1, refresh: true, loadType, ...params });
  } else {
    const threads = yield select(getThreads, fid);
    if (!threads || !threads.get('ids').size || loadType === 'loadmore') {
      yield call(fetchThreads(fid), { fid, pageNo: threads && threads.get('nextPage'), ...params });
    }
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadThreadPage() {
  yield takeEvery(LOAD_THREAD_PAGE, ({ fid, loadType }) =>
    loadThreads(fid, loadType));
}

export function* watchLoadThreadInfo() {
  yield takeEvery(LOAD_THREAD_INFO, ({ tid }) =>
    fetchThreadInfo(tid));
}

export function* watchLoadMoreThreads() {
  yield takeEvery(LOAD_MORE_THREADS, ({ fid }) =>
    loadThreads(fid, 'loadmore'));
}

export function* watchNewThread() {
  while (true) {
    const { fid, typeid, title, content } = yield take(NEW_THREAD);
    yield call(createThread, { fid, typeid, title, content });
  }
}

export function* watchFavThread() {
  while (true) {
    const { tid, fav } = yield take(FAV_THREAD);
    yield call(postFavThread, { tid, fav });
  }
}

export function* watchNewThreadSuccess() {
  while (true) {
    const { fid } = yield take(THREAD_CREATION.REQUEST);
    threadEmitter.emit('THREAD_CREATION_SUCCESS');
    yield call(fetchThreads(fid), { fid, pageNo: 1, refresh: true });
  }
}
