import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import { put, call } from 'redux-saga/effects';
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

const API_ROOT = 'http://saraba1st.asuscomm.com:20080/2b/api/app/';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema) {
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
      const normalizedJson = normalize(camelizedJson.data, schema);

      return {
        ...normalizedJson,
        nextPageUrl,
      };
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something bad happened' }),
    );
}

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass it to apiFn
export function* fetchEntity(entity, apiFn, id, url) {
  yield put(entity.request(id));
  const { response, error } = yield call(apiFn, url || id);
  if (response) {
    yield put(entity.success(id, response));
  } else {
    yield put(entity.failure(id, error));
  }
}


// api services
export const fetchForums = (fid) => {
  const url = fid === 'root' ? 'forum/all' : `forum?fid=${fid}`;
  return callApi(url, Schemas.forumSchemaArray);
};
