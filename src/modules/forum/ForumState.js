import { take, call, fork, select } from 'redux-saga/effects';
import { createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchEntity,
  fetchForums as apifetchForums,
  fetchChannels as apifetchChannels,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const channelRequestTypes = createRequestTypes('CHANNEL');
export const channelEntity = {
  request: () => createAction(
    channelRequestTypes.REQUEST),
  success: (_, response) => createAction(
    channelRequestTypes.SUCCESS, { response }),
  failure: (_, error) => createAction(
    channelRequestTypes.FAILURE, { error }),
};

export const forumRequestTypes = createRequestTypes('FORUM');
export const forumEntity = {
  request: fid => createAction(
    forumRequestTypes.REQUEST, { fid }),
  success: (fid, response) => createAction(
    forumRequestTypes.SUCCESS, { fid, response }),
  failure: (fid, error) => createAction(
    forumRequestTypes.FAILURE, { fid, error }),
};

export const LOAD_CHANNEL_PAGE = 'ForumState/LOAD_CHANNEL_PAGE';
export const loadChannelPage = (requiredFields = []) =>
  createAction(LOAD_CHANNEL_PAGE, { requiredFields });

export const LOAD_FORUM_PAGE = 'ForumState/LOAD_FORUM_PAGE';
export const loadForumPage = (fid, requiredFields = []) =>
  createAction(LOAD_FORUM_PAGE, { fid, requiredFields });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const fetchChannels = fetchEntity.bind(null, channelEntity, apifetchChannels);
const getChannels = state => state.getIn(['entities', 'channels']);

const fetchForums = fetchEntity.bind(null, forumEntity, apifetchForums);
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
