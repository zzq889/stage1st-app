import { Map } from 'immutable';
import { THREAD_FAV } from '../thread/ThreadState';
import { SUBSCRIBE_FORUM, UNSUBSCRIBE_FORUM } from '../forum/ForumState';
import { ARTICLE } from '../news/NewsState';

// Updates an entity cache in response to any action with response.entities.

export default function entities(state = Map({}), action) {
  // if articles, use shallow merge
  if (action.type === ARTICLE.SUCCESS) {
    if (action.response && action.response.entities) {
      return state.merge(action.response.entities);
    }
  }

  // if for others, use deep merge
  if (action.response && action.response.entities) {
    return state.mergeDeep(action.response.entities);
  }

  switch (action.type) {
    case THREAD_FAV.SUCCESS: {
      const { tid, fav } = action;
      return state.setIn(['threads', String(tid), 'isFav'], fav);
    }
    case SUBSCRIBE_FORUM: {
      const { fid } = action;
      return state.setIn(['forums', String(fid), 'isSubscribed'], true);
    }
    case UNSUBSCRIBE_FORUM: {
      const { fid } = action;
      return state.setIn(['forums', String(fid), 'isSubscribed'], false);
    }
    default:
      return state;
  }
}
