import { combineReducers } from 'redux-immutable';
import paginate from './paginate';
import { FORUM } from '../forum/ForumState';
import { THREAD } from '../thread/ThreadState';

// Updates the pagination data for different actions.
export default combineReducers({
  forumsByFid: paginate({
    mapActionToKey: action => action.fid,
    types: [
      FORUM.REQUEST,
      FORUM.SUCCESS,
      FORUM.FAILURE,
    ],
  }),
  threadsByFid: paginate({
    mapActionToKey: action => action.fid,
    types: [
      THREAD.REQUEST,
      THREAD.SUCCESS,
      THREAD.FAILURE,
    ],
  }),
});
