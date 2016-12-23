import { take, call, fork, select } from 'redux-saga/effects';
import { createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchEntity,
  fetchThreads as apifetchThreads,
} from '../../services/webApi';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/

export const THREAD = createRequestTypes('THREAD');
export const LOAD_THREAD_PAGE = 'ThreadState/LOAD_THREAD_PAGE';

export const threadEntity = {
  request: fid => createAction(
    THREAD.REQUEST, { fid }),
  success: (fid, response) => createAction(
    THREAD.SUCCESS, { fid, response }),
  failure: (fid, error) => createAction(
    THREAD.FAILURE, { fid, error }),
};

export const loadThreadPage = (fid, requiredFields = []) =>
  createAction(LOAD_THREAD_PAGE, { fid, requiredFields });

/** ****************************************************************************/
/** ***************************** Sagas *************************************/
/** ****************************************************************************/

const fetchThreads = fetchEntity.bind(null, threadEntity, apifetchThreads);
const getThreads = (state, fid) => state.getIn(['pagination', 'threadsByFid', fid]);

// load repo unless it is cached
function* loadThreads(fid, requiredFields) {
  const threads = yield select(getThreads, fid);
  if (!threads || !threads.get('ids').size || requiredFields.some(key => !threads.has(key))) {
    yield call(fetchThreads, fid);
  }
}

/** ****************************************************************************/
/** ***************************** WATCHERS *************************************/
/** ****************************************************************************/

export function* watchLoadThreadPage() {
  while (true) {
    const { fid, requiredFields = [] } = yield take(LOAD_THREAD_PAGE);
    yield fork(loadThreads, fid, requiredFields);
  }
}
