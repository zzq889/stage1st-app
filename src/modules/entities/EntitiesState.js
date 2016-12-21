import { Map } from 'immutable';
import merge from 'lodash.merge';

// Updates an entity cache in response to any action with response.entities.
export default function entities(state = Map(), action) {
  console.warn(JSON.stringify(action));
  if (action.response && action.response.entities) {
    console.warn(action.response.entities);
    return Map(merge(state.toJS(), action.response.entities));
  }
  return state;
}
