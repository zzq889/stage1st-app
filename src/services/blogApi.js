import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import { getConfiguration } from '../utils/configuration';
import * as SCHEMA from './schema';

//
export function url(path) {
  const apiRoot = getConfiguration('WP_ROOT');
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
async function callApi(method, endpoint, body, schema) {
  // console.warn(method, endpoint, body);
  const fullUrl = endpoint.match(/^http/) ? endpoint : url(endpoint);
  const headers = getRequestHeaders(body);
  const options = body
    ? { method, headers, body: JSON.stringify(body) }
    : { method, headers };

  const response = await fetch(fullUrl, options);
  const json = await response.json();
  if (!response.ok) {
    const err = new Error(json.message);
    err.json = json;
    throw err;
  }

  const camelizedJson = camelizeKeys(json);
  const responseJson = schema
    ? normalize(camelizedJson, schema)
    : camelizedJson;

  // TODO: nextPageUrl
  const nextPageUrl = '';

  return {
    ...responseJson,
    nextPageUrl,
  };
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
  return callApi('GET', endpoint + paramsString, null, ...otherArgs);
}

export function post(endpoint, body, ...args) {
  return callApi('POST', endpoint, body || {}, ...args);
}

/** ****************************************************************************/
/** ***************************** API Services *********************************/
/** ****************************************************************************/

// articles
export const fetchArticles = ({ before, after }) =>
  get('posts', { before, after }, [SCHEMA.articleSchema]);
