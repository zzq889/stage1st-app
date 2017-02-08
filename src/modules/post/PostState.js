import { Map } from 'immutable';
import { EventEmitter } from 'fbemitter';
import { take, takeEvery, call, select } from 'redux-saga/effects';
import { fetchEntity, createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchPosts as apiFetchPosts,
  createPost as apiCreatePost,
  fetchPostHistory as apiFetchPostHistory,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const POST = createRequestTypes('POST');
export const POST_CREATION = createRequestTypes('POST_CREATION');
export const LOAD_POST_PAGE = 'PostState/LOAD_POST_PAGE';
export const LOAD_POST_HISTORY_PAGE = 'PostState/LOAD_POST_HISTORY_PAGE';
export const JUMP_TO_PAGE = 'PostState/JUMP_TO_PAGE';
export const UPDATE_POST_OFFSET = 'PostState/UPDATE_POST_OFFSET';
export const NEW_POST = 'ThreadState/NEW_POST';

export const postEntity = {
  request: args => createAction(
    POST.REQUEST, { ...args }),
  success: (args, response) => createAction(
    POST.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    POST.FAILURE, { ...args, error }),
};

export const postCreationEntity = {
  request: args => createAction(
    POST_CREATION.REQUEST, { ...args }),
  success: (args, response) => createAction(
    POST_CREATION.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    POST_CREATION.FAILURE, { ...args, error }),
};

export const newPost = ({ tid, pid, content }) =>
  createAction(NEW_POST, { tid, pid, content });

export const loadPostPage = (tid, uid, pageNo = 1, loadType) =>
  createAction(LOAD_POST_PAGE, { tid, uid, pageNo, loadType });

export const loadPostHistoryPage = loadType =>
  createAction(LOAD_POST_HISTORY_PAGE, { loadType });

export const jumpToPage = (tid, uid, pageNo = 1) =>
  createAction(JUMP_TO_PAGE, { tid, uid, pageNo });

export const updatePostOffset = (tid, uid, pageNo = 1) =>
  createAction(UPDATE_POST_OFFSET, { tid, uid, pageNo });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

export const postEmitter = new EventEmitter();

const fetchPosts = args => fetchEntity(postEntity, apiFetchPosts, args);
const fetchPostHistory = args => fetchEntity(postEntity, apiFetchPostHistory, args);
const createPost = args => fetchEntity(postCreationEntity, apiCreatePost, args);
const getPosts = (state, key) =>
  state.getIn(['pagination', 'postsByKey', key]);

// load repo unless it is cached
function* loadPosts({ tid, uid, pageNo, loadType }) {
  const paginationKey = `${tid}.${uid || 'all'}`;
  const posts = yield select(getPosts, paginationKey);
  let page;
  if (posts) {
    page = posts.getIn(['pages', pageNo]);
  }
  if (
    !posts
    || !page
    || (page.size < 30)
    || loadType === 'refresh'
  ) {
    yield call(fetchPosts, { paginationKey, tid, uid, pageNo, loadType });
  }
}

function* loadPostHistory({ loadType }) {
  const paginationKey = 'history';
  if (loadType === 'refresh' || loadType === 'load') {
    yield call(fetchPostHistory, { paginationKey, pageNo: 1, refresh: true, loadType });
  } else {
    const posts = yield select(getPosts, paginationKey);
    if (!posts || !posts.get('ids').size || loadType === 'loadmore') {
      yield call(fetchPostHistory, { paginationKey, pageNo: posts && posts.get('nextPage') });
    }
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadPostPage() {
  yield takeEvery(LOAD_POST_PAGE, loadPosts);
}

export function* watchLoadPostHistoryPage() {
  yield takeEvery(LOAD_POST_HISTORY_PAGE, loadPostHistory);
}

export function* watchNewPost() {
  while (true) {
    const { tid, pid, content } = yield take(NEW_POST);
    yield call(createPost, { tid, pid, content });
  }
}

export function* watchNewPostSuccess() {
  while (true) {
    yield take(POST_CREATION.SUCCESS);
    postEmitter.emit('POST_CREATION_SUCESS');
  }
}

/** ****************************************************************************/
/** ***************************** REDUCERS *************************************/
/** ****************************************************************************/

export default function PostStateReducer(state = Map(), action) {
  switch (action.type) {
    case JUMP_TO_PAGE: {
      const { tid, uid = 'all', pageNo = 1 } = action;
      return state
        .setIn([tid, uid, 'pageNo'], pageNo);
    }
    default:
      return state;
  }
}
