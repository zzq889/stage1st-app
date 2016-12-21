import { take, call, fork, select } from 'redux-saga/effects';
import { createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchForums as apifetchForums,
} from '../../services/webApi';
import { fetchEntity } from '../../utils/sagaHelper';

// Actions
export const FORUM = createRequestTypes('FORUM');
export const forum = {
  request: fid => createAction(FORUM.REQUEST, { fid }),
  success: (fid, response) => createAction(FORUM.SUCCESS, { fid, response }),
  failure: (fid, error) => createAction(FORUM.FAILURE, { fid, error }),
};

export const LOAD_FORUM_PAGE = 'ForumState/LOAD_FORUM_PAGE';
export const loadForumPage = (fid = 'root', requiredFields = []) =>
  createAction(LOAD_FORUM_PAGE, { fid, requiredFields });

// Saga
const fetchForums = fetchEntity.bind(null, forum, apifetchForums);
const getForums = (state, fid) => state.getIn(['pagination', 'forumsByFid', fid]);

// load repo unless it is cached
function* loadForums(fid, requiredFields) {
  const forums = yield select(getForums, fid);
  if (!forums || requiredFields.some(key => !Object.prototype.hasOwnProperty.call(forum, key))) {
    yield call(fetchForums, fid);
  }
}

// Fetches forum list
export function* watchLoadForumPage() {
  while (true) {
    const { fid, requiredFields = [] } = yield take(LOAD_FORUM_PAGE);
    yield fork(loadForums, fid, requiredFields);
  }
}
