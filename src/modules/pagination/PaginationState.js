import { combineReducers } from 'redux-immutable';
import paginate from './paginate';
import { THREAD } from '../thread/ThreadState';
import { POST } from '../post/PostState';

// Updates the pagination data for different actions.
export default combineReducers({
  threadsById: paginate({
    mapActionToKey: action => action.fid,
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
