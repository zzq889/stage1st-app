import { EventEmitter } from 'fbemitter';
import { put, take, takeEvery, call, select } from 'redux-saga/effects';
import { fetchEntity, createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchArticles as apiFetchArticles,
  fetchComments as apiFetchComments,
  createComment as apiCreateComment,
} from '../../services/webApi';
import {
  handleSubmit,
  resetSubmit,
} from '../form/FormState';

export const newsEmitter = new EventEmitter();

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const ARTICLE = createRequestTypes('ARTICLE');
export const COMMENT = createRequestTypes('COMMENT');
export const COMMENT_CREATION = createRequestTypes('COMMENT_CREATION');
export const LOAD_NEWS_PAGE = 'NewsState/LOAD_NEWS_PAGE';
export const LOAD_COMMENTS_PAGE = 'NewsState/LOAD_COMMENTS_PAGE';
export const NEW_COMMENT = 'NewsState/NEW_COMMENT';

export const newsEntity = {
  request: args => createAction(
    ARTICLE.REQUEST, { ...args }),
  success: (args, response) => createAction(
    ARTICLE.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    ARTICLE.FAILURE, { ...args, error }),
};

export const commentsEntity = {
  request: args => createAction(
    COMMENT.REQUEST, { ...args }),
  success: (args, response) => createAction(
    COMMENT.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    COMMENT.FAILURE, { ...args, error }),
};

export const commentCreationEntity = {
  request: args => createAction(
    COMMENT_CREATION.REQUEST, { ...args }),
  success: (args, response) => createAction(
    COMMENT_CREATION.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    COMMENT_CREATION.FAILURE, { ...args, error }),
};

export const loadNewsPage = loadType =>
  createAction(LOAD_NEWS_PAGE, { loadType });

export const loadCommentsPage = postId =>
  createAction(LOAD_COMMENTS_PAGE, { postId });

export const newComment = ({ postId, content }) =>
  createAction(NEW_COMMENT, { postId, content });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const fetchArticles = args => fetchEntity(newsEntity, apiFetchArticles, args);
const fetchComments = args => fetchEntity(commentsEntity, apiFetchComments, args);
const createCommentRequest = args => fetchEntity(commentCreationEntity, apiCreateComment, args);

const getArticles = state => state.getIn(['entities', 'articles']);
// const getComments = (state, postId) => state.getIn(['pagination', 'commentsByKey', postId]);

function* loadArticles({ loadType }) {
  const articles = yield select(getArticles); // Get articles in global state
  if (!articles || !articles.size) { // if no articles are preloaded in state
    const page = 1;
    const perPage = 100;
    yield call(fetchArticles, { loadType, page, perPage });
  } else if (loadType === 'refresh') { // if is refresh action
    const page = 1;
    const perPage = 100;
    yield call(fetchArticles, { loadType, page, perPage });
  } else if (loadType === 'loadmore') { // currently not used
    const before = articles.sortBy(article => article.get('date')).last().get('date');
    yield call(fetchArticles, { before });
  }
}

function* loadComments({ postId }) {
  // const comments = yield select(getComments);
  // if (!comments || !comments.size) {
  //   yield call(fetchComments, { postId });
  // }
  yield call(fetchComments, { postId });
}

function* createComment({ postId, content }) {
  const author = yield select(state => state.getIn(['auth', 'currentUser', 'username']));
  if (author) {
    yield put(handleSubmit('commentComposeForm'));
    yield call(createCommentRequest, { postId, author, content });
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadNewsPage() {
  yield takeEvery(LOAD_NEWS_PAGE, loadArticles);
}

export function* watchLoadCommentsPage() {
  yield takeEvery(LOAD_COMMENTS_PAGE, loadComments);
}

export function* watchNewComment() {
  yield takeEvery(
    NEW_COMMENT,
    ({ postId, content }) => createComment({ postId, content }),
  );
}

export function* watchNewCommentSuccess() {
  while (true) {
    yield take(COMMENT_CREATION.SUCCESS);
    newsEmitter.emit('COMMENT_CREATION_SUCCESS');
  }
}

export function* watchNewCommentFailure() {
  while (true) {
    yield take(COMMENT_CREATION.FAILURE);
    yield put(resetSubmit('commentComposeForm'));
  }
}
