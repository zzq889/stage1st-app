import { takeEvery, call, select } from 'redux-saga/effects';
import { fetchEntity, createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchArticles as apiFetchArticles,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const ARTICLE = createRequestTypes('ARTICLE');
export const LOAD_NEWS_PAGE = 'NewsState/LOAD_NEWS_PAGE';

export const newsEntity = {
  request: args => createAction(
    ARTICLE.REQUEST, { ...args }),
  success: (args, response) => createAction(
    ARTICLE.SUCCESS, { ...args, response }),
  failure: (args, error) => createAction(
    ARTICLE.FAILURE, { ...args, error }),
};

export const loadNewsPage = loadType =>
  createAction(LOAD_NEWS_PAGE, { loadType });


/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const fetchArticles = args => fetchEntity(newsEntity, apiFetchArticles, args);
const getArticles = state => state.getIn(['entities', 'articles']);

function* loadArticles({ loadType }) {
  const articles = yield select(getArticles);
  if (!articles || !articles.size) {
    yield call(fetchArticles, { loadType });
  } else if (loadType === 'refresh') {
    const after = articles.sortBy(article => article.get('date')).first().get('date');
    yield call(fetchArticles, { loadType, after, refresh: true });
  } else if (loadType === 'loadmore') {
    const before = articles.sortBy(article => article.get('date')).last().get('date');
    yield call(fetchArticles, { before });
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadNewsPage() {
  yield takeEvery(LOAD_NEWS_PAGE, loadArticles);
}
