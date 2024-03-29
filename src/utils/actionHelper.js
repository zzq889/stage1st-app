/* eslint-disable no-param-reassign */

import { put, select, call } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

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

const getRouteName = (state) => {
  const nav = state.get('nav');
  return nav.routes[nav.index].routeName;
};

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass it to apiFn
export function* fetchEntity(entity, apiFn, args, success) {
  try {
    yield put(entity.request(args));
    const response = yield call(apiFn, args);
    yield put(entity.success(args, response));
    if (success) {
      yield call(success);
    }
  } catch (error) {
    const message = error.message || 'Something bad happened';
    // console.warn(message);
    yield put(entity.failure(args, message));
    // show login modal if invalid accessToken
    if (error.json && error.json.code === 501) {
      const routeName = yield select(getRouteName);
      if (routeName !== 'Login') {
        yield put(NavigationActions.navigate({ routeName: 'Login' }));
      }
    }
  }
}
