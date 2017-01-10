import { take, call, fork, select } from 'redux-saga/effects';
import { createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchEntity,
  fetchForum as apiFetchForum,
  fetchChannels as apiFetchChannels,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const CHANNEL = createRequestTypes('CHANNEL');
export const FORUM = createRequestTypes('FORUM');
export const LOAD_CHANNEL_PAGE = 'ForumState/LOAD_CHANNEL_PAGE';
export const LOAD_FORUM_PAGE = 'ForumState/LOAD_FORUM_PAGE';

export const channelEntity = {
  request: () => createAction(
    CHANNEL.REQUEST),
  success: (_, response) => createAction(
    CHANNEL.SUCCESS, { response }),
  failure: (_, error) => createAction(
    CHANNEL.FAILURE, { error }),
};

export const forumEntity = {
  request: fid => createAction(
    FORUM.REQUEST, { fid }),
  success: (fid, response) => createAction(
    FORUM.SUCCESS, { fid, response }),
  failure: (fid, error) => createAction(
    FORUM.FAILURE, { fid, error }),
};

export const loadChannelPage = (requiredFields = []) =>
  createAction(LOAD_CHANNEL_PAGE, { requiredFields });

export const loadForumPage = (fid, requiredFields = []) =>
  createAction(LOAD_FORUM_PAGE, { fid, requiredFields });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const fetchChannels = fetchEntity.bind(null, channelEntity, apiFetchChannels);
const getChannels = state => state.getIn(['entities', 'channels']);

const fetchForum = fetchEntity.bind(null, forumEntity, apiFetchForum);
const getForum = (state, fid) => state.getIn(['entities', 'forums', fid]);

// load repo unless it is cached
function* loadChannels(requiredFields) {
  const channels = yield select(getChannels);
  if (!channels || !channels.size || requiredFields.some(key => !channels.has(key))) {
    yield call(fetchChannels);
  }
}

// load forums unless it is cached
function* loadForum(fid, requiredFields) {
  const forum = yield select(getForum, fid);
  if (!forum || requiredFields.some(key => !forum.has(key))) {
    yield call(fetchForum, fid);
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadChannelPage() {
  while (true) {
    const { requiredFields = [] } = yield take(LOAD_CHANNEL_PAGE);
    yield fork(loadChannels, requiredFields);
  }
}

export function* watchLoadForumPage() {
  while (true) {
    const { fid, requiredFields = [] } = yield take(LOAD_FORUM_PAGE);
    // yield fork(loadForum, fid, requiredFields);
    yield call(fetchForum, fid);
  }
}
