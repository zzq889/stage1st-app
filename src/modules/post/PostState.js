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

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const fetchPosts = fetchEntity.bind(null, postEntity, apiFetchPosts);
const getPosts = (state, { tid, uid, pageNo }) =>
  state.getIn(['pagination', 'postsByTid', `${tid}.${uid}.${pageNo}`]);

// load repo unless it is cached
function* loadPosts({ tid, uid, pageNo }) {
  const posts = yield select(getPosts, { tid, uid, pageNo });
  if (!posts || !posts.get('ids').size) {
    yield call(fetchPosts, { tid, uid, pageNo });
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadPostPage() {
  yield takeEvery(LOAD_POST_PAGE, loadPosts);
}
