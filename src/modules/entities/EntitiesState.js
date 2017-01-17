import { Map } from 'immutable';
import { THREAD_FAV } from '../thread/ThreadState';

// Updates an entity cache in response to any action with response.entities.
export default function entities(state = Map(), action) {
  if (action.response && action.response.entities) {
    return state.mergeDeep(action.response.entities);
  }
  if (action.type === THREAD_FAV.SUCCESS) {
    const { tid } = action;
    return state.setIn(['threads', String(tid), 'isFav'], true);
  }
  return state;
}
