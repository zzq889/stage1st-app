import { Map } from 'immutable';

// Updates an entity cache in response to any action with response.entities.
export default function entities(state = Map(), action) {
  if (action.response && action.response.entities) {
    return state.mergeDeep(action.response.entities);
  }
  return state;
}
