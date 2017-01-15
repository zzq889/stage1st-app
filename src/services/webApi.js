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
function getNextPage(data, totalPage) {
  const currentPage = data.pageNo || 1;
  if (currentPage < totalPage) {
    return currentPage + 1;
  }
  return null;
}

function getTotalPage(data) {
  return (data && data.totalCount && Math.ceil(data.totalCount / 30)) || 1;
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
  const totalPage = getTotalPage(json.data);
  const nextPage = getNextPage(json.data, totalPage);
  const responseJson = schema
    ? normalize(normalizeKey(camelizedJson), schema)
    : camelizedJson;

  return {
    ...responseJson,
    nextPage,
    totalPage,
  };
}

const getToken = state => state.getIn(['auth', 'token']);

export function* callApiAsync(...args) {
  const token = yield select(getToken);
  return yield call(callApi, token, ...args);
}

export function get(endpoint, params, ...otherArgs) {
  const paramsString = params
    ? Object.keys(params).reduce((str, key) => {
      const value = params[key];
      return value
        ? `${str}&${key}=${encodeURIComponent(value)}`
        : str;
    }, '?')
    : '';
  return callApiAsync('GET', endpoint + paramsString, null, ...otherArgs);
}

export function post(...args) {
  return callApiAsync('POST', ...args);
}

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass it to apiFn
export function* fetchEntity(entity, apiFn, args) {
  try {
    yield put(entity.request(args));
    const response = yield call(apiFn, args);
    yield put(entity.success(args, response));
  } catch (error) {
    const message = error.message || 'Something bad happened';
    // console.warn(message);
    yield put(entity.failure(args, message));
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

export const fetchForum = fid =>
  get('forum', { fid }, SCHEMA.forumSchema);

// thread
export const fetchThreads = ({ fid, pageNo }) =>
  get('forum/page', { fid, pageNo }, SCHEMA.threadSchemaArray);

export const fetchSubscribedThreads = () =>
  get('forum/subscribed', null, SCHEMA.threadSchemaArray);

export const fetchThreadInfo = tid =>
  get('thread', { tid }, SCHEMA.threadSchema);

export const favThread = tid =>
  post('thread/favor', { tid, action: 'add' }, SCHEMA.threadSchema);

export const fetchFavedThreads = () =>
  get('favor/page', null, SCHEMA.threadSchemaArray);

export const createThread = ({ fid, typeid, title, content }) =>
  post('post/thread', { fid, typeid, title, content }, SCHEMA.threadSchema);

// post
export const fetchPosts = ({ tid, uid, pageNo }) =>
  get('thread/page', { tid, uid, pageNo }, SCHEMA.postSchemaArray);

export const createPost = ({ tid, pid, typeid, title, content }) =>
  post('post/post', { tid, pid, typeid, title, content }, SCHEMA.postSchema);

export const reportPost = ({ pid, message }) =>
  post('post/report', { pid, message });

// smiles
export const fetchSmiles = () =>
  get('post/smiles', null, SCHEMA.smileySchema);
