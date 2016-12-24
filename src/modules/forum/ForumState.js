import { take, call, fork, select } from 'redux-saga/effects';
import uuid from 'uuid';
import { createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchEntity,
  fetchForums as apiFetchForums,
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
    CHANNEL.FAILURE, { error, id: uuid() }),
};

export const forumEntity = {
  request: fid => createAction(
    FORUM.REQUEST, { fid }),
  success: (fid, response) => createAction(
    FORUM.SUCCESS, { fid, response }),
  failure: (fid, error) => createAction(
    FORUM.FAILURE, { fid, error, id: uuid() }),
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

const fetchForums = fetchEntity.bind(null, forumEntity, apiFetchForums);
const getForums = (state, fid) => state.getIn(['pagination', 'forumsByFid', fid]);

// load repo unless it is cached
function* loadChannels(requiredFields) {
  const channels = yield select(getChannels);
  if (!channels || !channels.size || requiredFields.some(key => !channels.has(key))) {
    yield call(fetchChannels);
  }
}

// load repo unless it is cached
function* loadForums(fid, requiredFields) {
  const forums = yield select(getForums, fid);
  if (!forums || !forums.get('ids').size || requiredFields.some(key => !forums.has(key))) {
    yield call(fetchForums, fid);
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
    yield fork(loadForums, fid, requiredFields);
  }
}
