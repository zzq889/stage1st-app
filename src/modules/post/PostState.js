import { Map } from 'immutable';
import { takeEvery, call, select } from 'redux-saga/effects';
import { createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchEntity,
  fetchPosts as apiFetchPosts,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const POST = createRequestTypes('POST');
export const LOAD_POST_PAGE = 'PostState/LOAD_POST_PAGE';
export const JUMP_TO_PAGE = 'PostState/JUMP_TO_PAGE';
export const UPDATE_POST_OFFSET = 'PostState/UPDATE_POST_OFFSET';

export const postEntity = {
  request: args => createAction(
    POST.REQUEST, { ...args }),
  success: (args, response) => createAction(
    POST.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    POST.FAILURE, { ...args, error }),
};

export const loadPostPage = (tid, uid, pageNo = 1) =>
  createAction(LOAD_POST_PAGE, { tid, uid, pageNo });

export const jumpToPage = (tid, uid, pageNo = 1) =>
  createAction(JUMP_TO_PAGE, { tid, uid, pageNo });

export const updatePostOffset = (tid, uid, pageNo = 1) =>
  createAction(UPDATE_POST_OFFSET, { tid, uid, pageNo });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const fetchPosts = fetchEntity.bind(null, postEntity, apiFetchPosts);
const getPosts = (state, { tid, uid = 'all' }) =>
  state.getIn(['pagination', 'postsByTid', `${tid}.${uid}`]);

// load repo unless it is cached
function* loadPosts({ tid, uid, pageNo }) {
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
  if (!posts || !page
    || (!isLast && page.size < 30)
    || (isLast && page.size < lastPageSize)
  ) {
    yield call(fetchPosts, { tid, uid, pageNo });
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadPostPage() {
  yield takeEvery(LOAD_POST_PAGE, loadPosts);
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
