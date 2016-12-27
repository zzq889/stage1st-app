import { combineReducers } from 'redux-immutable';
import paginate from './paginate';
import { FORUM } from '../forum/ForumState';
import { THREAD } from '../thread/ThreadState';
import { POST } from '../post/PostState';

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
  threadsById: paginate({
    mapActionToKey: action => action.id,
    types: [
      THREAD.REQUEST,
      THREAD.SUCCESS,
      THREAD.FAILURE,
    ],
  }),
  postsByTid: paginate({
    mapActionToKey: action => action.tid,
    types: [
      POST.REQUEST,
      POST.SUCCESS,
      POST.FAILURE,
    ],
  }),
});
