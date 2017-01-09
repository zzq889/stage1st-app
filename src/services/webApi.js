import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import { put, call, select } from 'redux-saga/effects';
import { getConfiguration } from '../utils/configuration';
import * as SCHEMA from './schema';

//
export function url(path) {
  const apiRoot = getConfiguration('API_ROOT');
  return path.indexOf('/') === 0
    ? apiRoot + path
    : `${apiRoot}/${path}`;
}

// Extracts the next page URL from API response.
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

function getRequestHeaders(body, token) {
  // const headers = body
  //   ? { Accept: 'application/json', 'Content-Type': 'application/json' }
  //   : { Accept: 'application/json' };
  const headers = { Accept: 'application/json' };

  if (token) {
    return { ...headers, Authorization: token };
  }

  return headers;
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
async function callApi(token, method, endpoint, body, schema, mapResponseToKey) {
  const fullUrl = endpoint.match(/^http/) ? endpoint : url(endpoint);
  const headers = getRequestHeaders(body, token);
  const initialForm = new FormData();
  if (token) {
    initialForm.append('sid', token);
  }
  const options = body
    ? {
      method,
      headers,
      body: Object.keys(body).reduce(
        (form, key) => { form.append(key, body[key]); return form; },
        initialForm,
      ),
    }
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

const getToken = state => state.getIn(['auth', 'token']);

export function* callApiAsync(...args) {
  const token = yield select(getToken);
  return yield call(callApi, token, ...args);
}

export function get(endpoint, params, ...otherArgs) {
  const paramsString = params
    ? Object.keys(params).reduce((str, key) =>
      `${str}&${key}=${encodeURIComponent(params[key])}`, '?')
    : '';
  return callApiAsync('GET', endpoint + paramsString, null, ...otherArgs);
}

export function post(endpoint, body, ...otherArgs) {
  return callApiAsync('POST', endpoint, body, ...otherArgs);
}

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass it to apiFn
export function* fetchEntity(entity, apiFn, id, nextUrl) {
  try {
    yield put(entity.request(id));
    const response = yield call(apiFn, nextUrl || id);
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
  post('user/login', { username, password });

export const userRegister = ({ username, password, email }) =>
  post('user/register', { username, password, email });

export const userLogout = uid =>
  post('user/logout', { uid });

export const userSign = uid =>
  post('user/sign', { uid });

export const fetchUserInfo = uid =>
  get('user', { uid }, SCHEMA.userSchema);

// notification
export const fetchNotication = uid =>
  get(`notice/${uid}`);

export const fetchHistory = uid =>
  get(`history/${uid}`);

// forum
export const fetchChannels = () =>
  get('forum/all', null, SCHEMA.forumSchemaArray);

export const fetchForums = fid =>
  get('forum', { fid }, SCHEMA.forumSchema);

// thread
export const fetchThreads = fid =>
  get('forum/page', { fid }, SCHEMA.threadSchemaArray);

export const fetchSubscribedThreads = () =>
  get('forum/subscribed', null, SCHEMA.threadSchemaArray);

export const fetchThreadInfo = tid =>
  get('thread', { tid }, SCHEMA.threadSchema);

export const favThread = tid =>
  post('thread/favor', { tid, action: 'add' }, SCHEMA.threadSchema);

export const fetchFavedThreads = () =>
  get('favor/page', null, SCHEMA.threadSchemaArray);

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
