import { combineReducers } from 'redux-immutable';
import paginate from './paginate';
import { THREAD } from '../thread/ThreadState';
import { POST } from '../post/PostState';
import { NOTIFICATION } from '../notification/NotificationState';
import { ARTICLE } from '../news/NewsState';

// Updates the pagination data for different actions.
export default combineReducers({
  threadsByKey: paginate({
    mapActionToKey: ({ paginationKey }) => paginationKey,
    types: [
      THREAD.REQUEST,
      THREAD.SUCCESS,
      THREAD.FAILURE,
    ],
  }),
  postsByKey: paginate({
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
  articlesByKey: paginate({
    mapActionToKey: () => 'all',
    types: [
      ARTICLE.REQUEST,
      ARTICLE.SUCCESS,
      ARTICLE.FAILURE,
    ],
  }),
});
