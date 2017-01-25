import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import { call, select } from 'redux-saga/effects';
import { getConfiguration } from '../utils/configuration';
import * as SCHEMA from './schema';

const DEBUG = __DEV__ && false;

//
export function url(path) {
  const apiRoot = getConfiguration('API_ROOT');
  return path.indexOf('/') === 0
    ? apiRoot + path
    : `${apiRoot}/${path}`;
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

function objectToUriComponent(body) {
  return body ? Object.keys(body).reduce((str, key) => {
    const value = body[key];
    if (value) {
      return str === ''
        ? `?${key}=${encodeURIComponent(value)}`
        : `${str}&${key}=${encodeURIComponent(value)}`;
    }
    return str;
  }, '') : '';
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
async function callApi(token, method, endpoint, body, schema, mapResponseToKey) {
  if (DEBUG) {
    console.warn(method, endpoint, body);
  }
  const paramsString = (method === 'GET') ? objectToUriComponent(body) : '';
  const fullUrl = (endpoint.match(/^http/) ? endpoint : url(endpoint)) + paramsString;
  const headers = getRequestHeaders(body, token);
  const initialForm = new FormData();
  if (token) {
    initialForm.append('sid', token);
  }
  const options = (method !== 'GET')
    ? {
      method,
      headers,
      body: Object.keys(body || {}).reduce(
        (form, key) => {
          if (body[key]) {
            form.append(key, body[key]);
          }
          return form;
        },
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

  // pageCount and nextUrl
  const { totalCount, pageNo, pageSize } = (json.data || {});

  const camelizedJson = camelizeKeys(json);
  const responseJson = schema
    ? normalize(normalizeKey(camelizedJson), schema)
    : camelizedJson;

  return {
    ...responseJson,
    totalCount,
    pageSize,
    pageNo,
  };
}

const getToken = state => state.getIn(['auth', 'token']);

export function* callApiAsync(method, ...args) {
  const token = yield select(getToken);
  let newMethod = method || 'GET';
  if (token && !method) {
    newMethod = 'POST';
  }
  return yield call(callApi, token, newMethod, ...args);
}

export function get(...args) {
  return callApiAsync('GET', ...args);
}

export function post(...args) {
  return callApiAsync('POST', ...args);
}

export function request(...args) {
  return callApiAsync(null, ...args);
}

/** ****************************************************************************/
/** ***************************** API Services *********************************/
/** ****************************************************************************/

// user
export const userLogin = ({ username, password, questionid, answer }) => {
  if (questionid && questionid !== 0) {
    return post('user/login', { username, password, questionid, answer });
  }
  return post('user/login', { username, password });
};


export const userRegister = ({ username, password, email }) =>
  post('user/register', { username, password, email });

export const userLogout = uid =>
  post('user/logout', { uid });

export const userSign = uid =>
  post('user/sign', { uid });

export const fetchUserInfo = uid =>
  get('user', { uid }, SCHEMA.userSchema);

// notification
export const fetchNotication = () =>
  post('notice/reply');

// history
export const fetchThreadHistory = () =>
  post('history/thread', null, SCHEMA.threadSchemaArray);

export const fetchPostHistory = () =>
  post('history/post', null, SCHEMA.postSchemaArray);

// forum
export const fetchChannels = () =>
  get('forum/all', null, SCHEMA.forumSchemaArray);

export const fetchForum = fid =>
  request('forum', { fid }, SCHEMA.forumSchema);

// thread
export const fetchThreads = ({ fid, pageNo }) =>
  request('forum/page', { fid, pageNo }, SCHEMA.threadSchemaArray);

export const fetchThreadInfo = tid =>
  request('thread', { tid }, SCHEMA.threadSchema);

export const fetchSubscribedThreads = ({ fid, list, pageNo }) =>
  request('forum/subscribed', { fid, list, pageNo }, SCHEMA.threadSchemaArray);


export const favThread = ({ tid, fav }) =>
  post('thread/favor', { tid, action: fav ? 'add' : 'remove' });

export const fetchFavedThreads = () =>
  post('favor/page', null, SCHEMA.threadSchemaArray);

export const createThread = ({ fid, typeid, title, content }) =>
  post('post/thread', { fid, typeid, title, content }, SCHEMA.threadSchema);

// post
export const fetchPosts = ({ tid, uid, pageNo }) =>
  request('thread/page', { tid, uid, pageNo }, SCHEMA.postSchemaArray);

// pid: optional
// tid: required
// content: required
export const createPost = ({ tid, pid, content }) =>
  post('post/post', { tid, pid, content }, SCHEMA.postSchema);

export const reportPost = ({ pid, message }) =>
  post('post/report', { pid, message });

// smiles
export const fetchSmiles = () =>
  get('post/smiles', null, SCHEMA.smileySchema);
