import { combineReducers } from 'redux-immutable';
import paginate from './paginate';
import { THREAD } from '../thread/ThreadState';
import { POST } from '../post/PostState';
import { NOTIFICATION } from '../notification/NotificationState';

// Updates the pagination data for different actions.
export default combineReducers({
  threadsByFid: paginate({
    mapActionToKey: ({ fid }) => fid,
    types: [
      THREAD.REQUEST,
      THREAD.SUCCESS,
      THREAD.FAILURE,
    ],
  }),
  postsByTid: paginate({
    mapActionToKey: ({ paginationKey }) => paginationKey,
    types: [
      POST.REQUEST,
      POST.SUCCESS,
      POST.FAILURE,
    ],
  }),
  notificationsByKey: paginate({
    mapActionToKey: ({ paginationKey }) => paginationKey,
    types: [
      NOTIFICATION.REQUEST,
      NOTIFICATION.SUCCESS,
      NOTIFICATION.FAILURE,
    ],
  }),
});
