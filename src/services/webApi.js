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
  // console.warn(method, endpoint, body);
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

export function* callApiAsync(...args) {
  const token = yield select(getToken);
  return yield call(callApi, token, ...args);
}

export function get(endpoint, params, ...otherArgs) {
  const paramsString = params
    ? Object.keys(params).reduce((str, key) => {
      const value = params[key];
      if (value) {
        return str === ''
          ? `?${key}=${encodeURIComponent(value)}`
          : `${str}&${key}=${encodeURIComponent(value)}`;
      }
      return str;
    }, '')
    : '';
  return callApiAsync('GET', endpoint + paramsString, null, ...otherArgs);
}

export function post(endpoint, body, ...args) {
  return callApiAsync('POST', endpoint, body || {}, ...args);
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
  get('forum', { fid }, SCHEMA.forumSchema);

// thread
export const fetchThreads = ({ fid, pageNo }) =>
  get('forum/page', { fid, pageNo }, SCHEMA.threadSchemaArray);

export const fetchThreadInfo = tid =>
  get('thread', { tid }, SCHEMA.threadSchema);

export const fetchSubscribedThreads = () =>
  get('forum/subscribed', null, SCHEMA.threadSchemaArray);

export const favThread = tid =>
  post('thread/favor', { tid, action: 'add' });

export const fetchFavedThreads = () =>
  post('favor/page', null, SCHEMA.threadSchemaArray);

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
