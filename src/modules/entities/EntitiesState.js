import { Map, fromJS } from 'immutable';
import merge from 'lodash.merge';

// Updates an entity cache in response to any action with response.entities.
export default function entities(state = Map(), action) {
  if (action.response && action.response.entities) {
    return fromJS(merge(state.toJS(), action.response.entities));
  }
  return state;
}
