import { Map } from 'immutable';
import { EventEmitter } from 'fbemitter';
import { take, takeEvery, call, select } from 'redux-saga/effects';
import { fetchEntity, createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchPosts as apiFetchPosts,
  createPost as apiCreatePost,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const POST = createRequestTypes('POST');
export const POST_CREATION = createRequestTypes('POST_CREATION');
export const LOAD_POST_PAGE = 'PostState/LOAD_POST_PAGE';
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

export const jumpToPage = (tid, uid, pageNo = 1) =>
  createAction(JUMP_TO_PAGE, { tid, uid, pageNo });

export const updatePostOffset = (tid, uid, pageNo = 1) =>
  createAction(UPDATE_POST_OFFSET, { tid, uid, pageNo });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

export const postEmitter = new EventEmitter();

const fetchPosts = args => fetchEntity(postEntity, apiFetchPosts, args);
const createPost = args => fetchEntity(postCreationEntity, apiCreatePost, args);
const getPosts = (state, { tid, uid = 'all' }) =>
  state.getIn(['pagination', 'postsByTid', `${tid}.${uid}`]);

// load repo unless it is cached
function* loadPosts({ tid, uid, pageNo, loadType }) {
  const posts = yield select(getPosts, { tid, uid });
  let page;
  let totalPage;
  let lastPageSize;
  let isLast;
  if (posts) {
    page = posts.getIn(['pages', pageNo]);
    totalPage = posts.get('totalPage');
    lastPageSize = posts.get('lastPageSize');
    isLast = pageNo === totalPage;
  }
  if (
    !posts
    || !page
    || (!isLast && page.size < 30)
    || (isLast && page.size < lastPageSize)
    || loadType === 'refresh'
  ) {
    yield call(fetchPosts, { tid, uid, pageNo, loadType });
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadPostPage() {
  yield takeEvery(LOAD_POST_PAGE, loadPosts);
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
