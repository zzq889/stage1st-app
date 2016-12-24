import { take, call, fork, select } from 'redux-saga/effects';
import uuid from 'uuid';
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
  request: tid => createAction(
    POST.REQUEST, { tid }),
  success: (tid, response) => createAction(
    POST.SUCCESS, { tid, response }),
  failure: (tid, error) => createAction(
    POST.FAILURE, { tid, error, id: uuid() }),
};

export const loadPostPage = (tid, requiredFields = []) =>
  createAction(LOAD_POST_PAGE, { tid, requiredFields });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const fetchPosts = fetchEntity.bind(null, postEntity, apiFetchPosts);
const getPosts = (state, tid) => state.getIn(['pagination', 'postsByTid', tid]);

// load repo unless it is cached
function* loadPosts(tid, requiredFields) {
  const posts = yield select(getPosts, tid);
  if (!posts || !posts.get('ids').size || requiredFields.some(key => !posts.has(key))) {
    yield call(fetchPosts, tid);
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadPostPage() {
  while (true) {
    const { tid, requiredFields = [] } = yield take(LOAD_POST_PAGE);
    yield fork(loadPosts, tid, requiredFields);
  }
}
