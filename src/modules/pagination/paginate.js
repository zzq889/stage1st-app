import { Set, Map } from 'immutable';

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function paginate({ types, mapActionToKey }) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [requestType, successType, failureType] = types;

  function updatePagination(state = Map({
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: Set(),
  }), action) {
    switch (action.type) {
      case requestType:
        return state.set('isFetching', true);
      case successType:
        return state
          .set('isFetching', false)
          .update('ids', value => value.union(action.response.result));
          // TODO: nextPageUrl
          // .set('nextPageUrl', action.response.nextPageUrl)
          // .update('pageCount', value => value + 1);
      case failureType:
        return state.set('isFetching', false);
      default:
        return state;
    }
  }

  return function updatePaginationByKey(state = Map(), action) {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType: {
        const key = mapActionToKey(action);
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }
        return state.update(key, value => updatePagination(value, action));
      }
      default:
        return state;
    }
  };
}