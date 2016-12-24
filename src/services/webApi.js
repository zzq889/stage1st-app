import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import { put, call } from 'redux-saga/effects';
import { getConfiguration } from '../utils/configuration';
import { getAuthenticationToken } from '../utils/authentication';
import * as SCHEMA from './schema';

// Extracts the next page URL from Github API response.
function getNextPageUrl(response) {
  const link = response.headers.get('link');
  if (!link) {
    return null;
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
  if (!nextLink) {
    return null;
  }

  return nextLink.split(';')[0].slice(1, -1);
}

const API_ROOT = getConfiguration('API_ROOT');

function getRequestHeaders(body, token) {
  const headers = body
    ? { Accept: 'application/json', 'Content-Type': 'application/json' }
    : { Accept: 'application/json' };

  if (token) {
    return { ...headers, Authorization: token };
  }

  return headers;
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
async function callApi(method, endpoint, body, schema, mapResponseToKey) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  const token = await getAuthenticationToken();
  const headers = getRequestHeaders(body, token);
  const options = body
    ? { method, headers, body: JSON.stringify(body) }
    : { method, headers };

  const normalizeKey = mapResponseToKey
    || (res => (res.data && res.data.list) || res.data);

  const response = await fetch(fullUrl, options);
  const json = await response.json();
  if (!response.ok || !json.success) {
    const err = new Error(json.message);
    err.json = json;
    throw err;
  }

  const camelizedJson = camelizeKeys(json);
  const nextPageUrl = getNextPageUrl(response);
  const responseJson = schema
    ? normalize(normalizeKey(camelizedJson), schema)
    : camelizedJson;

  return {
    ...responseJson,
    nextPageUrl,
  };
}

export async function get(endpoint, params, ...otherParams) {
  const paramsString = params
    ? Object.keys(params).reduce((str, key) =>
      `${str}&${key}=${encodeURIComponent(params[key])}`, '?')
    : '';
  return callApi('GET', endpoint + paramsString, null, ...otherParams);
}

export async function post(endpoint, body, ...otherParams) {
  return callApi('POST', ...otherParams);
}

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass it to apiFn
export function* fetchEntity(entity, apiFn, id, url) {
  try {
    yield put(entity.request(id));
    const response = yield call(apiFn, url || id);
    yield put(entity.success(id, response));
  } catch (error) {
    const message = error.message || 'Something bad happened';
    // console.warn(message);
    yield put(entity.failure(id, message));
  }
}


/** ****************************************************************************/
/** ***************************** API Services *********************************/
/** ****************************************************************************/

// user
export const userLogin = ({ username, password }) =>
  post('user/login', { username, password }, SCHEMA.userSchema);

export const userRegister = ({ username, password, email }) =>
  post('user/register', { username, password, email }, SCHEMA.userSchema);

export const userLogout = uid =>
  post('user/logout', { uid });

export const userSign = uid =>
  post('user/sign', { uid });

export const fetchUserInfo = uid =>
  get('user', { uid }, SCHEMA.userSchema);

// notification
export const fetchNotication = uid =>
  get(`notice/${uid}`, null);

export const fetchHistory = uid =>
  get(`history/${uid}`, null);

// forum
export const fetchChannels = () =>
  get('forum/all', null, SCHEMA.forumSchemaArray);

export const fetchForums = fid =>
  get('forum', { fid }, SCHEMA.forumSchema);

// thread
export const fetchThreads = fid =>
  get('forum/page', { fid }, SCHEMA.threadSchemaArray);

export const fetchThreadInfo = tid =>
  get('thread', { tid }, SCHEMA.threadSchema);

export const favThread = tid =>
  post('thread/favor', { tid, action: 'add' }, SCHEMA.threadSchema);

export const fetchFavedThreads = () =>
  get('thread/favor', null, SCHEMA.threadSchemaArray);

export const createThread = ({ fid, typeid, title, content }) =>
  post('post/thread', { fid, typeid, title, content }, SCHEMA.postSchema);

// post
export const fetchPosts = (tid, uid) =>
  get('thread/page', { tid, uid }, SCHEMA.postSchemaArray);

export const createPost = ({ tid, pid, typeid, title, content }) =>
  post('post/post', { tid, pid, typeid, title, content }, SCHEMA.postSchema);

export const reportPost = ({ pid, message }) =>
  post('post/report', { pid, message });

// smiles
export const fetchSmiles = () =>
  get('post/smiles', null, SCHEMA.smileySchema);
