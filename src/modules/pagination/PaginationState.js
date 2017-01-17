import { combineReducers } from 'redux-immutable';
import paginate from './paginate';
import { THREAD } from '../thread/ThreadState';
import { POST } from '../post/PostState';

// Updates the pagination data for different actions.
export default combineReducers({
  threadsByFid: paginate({
    mapActionToKey: action => action.fid,
    types: [
      THREAD.REQUEST,
      THREAD.SUCCESS,
      THREAD.FAILURE,
    ],
  }),
  postsByTid: paginate({
    mapActionToKey: ({ tid, uid = 'all' }) => `${tid}.${uid}`,
    types: [
      POST.REQUEST,
      POST.SUCCESS,
      POST.FAILURE,
    ],
  }),
});
