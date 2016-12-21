import { Map } from 'immutable';
import { loop, Effects } from 'redux-loop';
import { createRequestTypes, createAction } from '../../utils/actionHelper';
import {
  fetchForums as apifetchForums,
} from '../../services/webApi';

// Initial state
const initialState = Map();

export const FORUM = createRequestTypes('FORUM');
export const LOAD_FORUM_PAGE = 'ForumState/LOAD_FORUM_PAGE';

export const forum = {
  request: fid => createAction(FORUM.REQUEST, fid),
  success: (fid, response) => createAction(FORUM.SUCCESS, { fid, response }),
  failure: (fid, error) => createAction(FORUM.FAILURE, { fid, error }),
};

export const loadForumPage = (fid, requiredFields = []) =>
  createAction(LOAD_FORUM_PAGE, { fid, requiredFields });

// Reducer
async function fetchEntity(entity, apiFn, id, url) {
  Effects.constant(entity.request(id));
  const { response, error } = await apiFn(id || url);
  if (response) {
    return Effects.constant(entity.success(id, response));
  }
  console.warn(error);
  return Effects.constant(entity.failure(id, error));
}

const fetchForums = fetchEntity.bind(null, forum, apifetchForums);

export default function ForumStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_FORUM_PAGE:
      return loop(
        state,
        Effects.promise(fetchForums, action.fid),
      );

    default:
      return state;
  }
}
