import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import { put, call } from 'redux-saga/effects';
import { getConfiguration } from '../utils/configuration';
import * as Schemas from './schema';

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

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema, mapResponseToKey) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response })),
    )
    .then(({ json, response }) => {
      if (!response.ok || !json.success) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);
      const nextPageUrl = getNextPageUrl(response);
      const normalizedJson = normalize(mapResponseToKey(camelizedJson), schema);

      return {
        ...normalizedJson,
        nextPageUrl,
      };
    });
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


// api services
export const fetchChannels = () =>
  callApi('forum/all', Schemas.forumSchemaArray, res => res.data);

export const fetchForums = fid =>
  callApi(`forum?fid=${fid}`, Schemas.forumSchema, res => res.data);

export const fetchThreads = fid =>
  callApi(`forum/page?fid=${fid}`, Schemas.threadSchemaArray, res => res.data.list);

export const fetchThreadInfo = tid =>
  callApi(`thread?tid=${tid}`, Schemas.threadSchema, res => res.data);

export const fetchPosts = tid =>
  callApi(`thread/page?tid=${tid}`, Schemas.postSchemaArray, res => res.data.list);
