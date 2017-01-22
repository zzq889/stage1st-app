/* eslint-disable no-param-reassign */

import { put, call } from 'redux-saga/effects';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function createAction(type, payload = {}) {
  return { type, ...payload };
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
