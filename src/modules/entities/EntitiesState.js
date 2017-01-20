import { Map } from 'immutable';
import { THREAD_FAV } from '../thread/ThreadState';
import { SUBSCRIBE_FORUM, UNSUBSCRIBE_FORUM } from '../forum/ForumState';

// Updates an entity cache in response to any action with response.entities.
export default function entities(state = Map(), action) {
  if (action.response && action.response.entities) {
    return state.mergeDeep(action.response.entities);
  }
  switch (action.type) {
    case THREAD_FAV.SUCCESS: {
      const { tid } = action;
      return state.setIn(['threads', String(tid), 'isFav'], true);
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
