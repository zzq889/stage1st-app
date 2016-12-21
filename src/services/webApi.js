import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
// import * as api from '../utils/api';
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
      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);
      const nextPageUrl = getNextPageUrl(response);

      return {
        ...normalize(camelizedJson, schema),
        nextPageUrl,
      };
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something bad happened' }),
    );
}

// api services
export const fetchForums = (fid) => {
  const url = fid ? `forum?fid=${fid}` : 'forum/all';
  return callApi(url, Schemas.forumSchema);
};
