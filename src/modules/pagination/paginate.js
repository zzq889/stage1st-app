import { OrderedSet, Set, Map } from 'immutable';

function getNextPage(currentPage = 1, totalPage) {
  if (currentPage < totalPage) {
    return currentPage + 1;
  }
  return null;
}

function getTotalPage(totalCount, pageSize = 30) {
  return (totalCount && Math.ceil(totalCount / pageSize)) || 1;
}

function getLastPageSize(totalCount, pageSize = 30) {
  return totalCount % pageSize;
}

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
    nextPage: undefined,
    refresh: false,
    totalPage: 0,
    lastPageSize: 0,
    ids: OrderedSet(),
    pages: Map(),
  }), action) {
    switch (action.type) {
      case requestType:
        return state
          .set('isFetching', true)
          .set('refresh', action.refresh || action.force || false);
      case successType: {
        const { pageNo, pageSize, totalCount, result } = action.response;
        const totalPage = getTotalPage(totalCount, pageSize);
        const lastPageSize = getLastPageSize(totalCount, pageSize);
        const nextPage = getNextPage(pageNo, totalPage);
        const newState = state
          .set('isFetching', false)
          .set('currentPage', pageNo)
          .set('totalPage', totalPage)
          .set('nextPage', nextPage)
          .set('lastPageSize', lastPageSize);
        if (action.refresh) {
          return newState
            .set('ids', OrderedSet(result))
            .set('pages', Map({
              [pageNo]: Set(result),
            }));
        }
        return newState
          .update('ids', value => value.union(result))
          .setIn(['pages', pageNo], Set(result));
      }
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
        if (typeof key !== 'string' && typeof key !== 'number') {
          // console.warn('Expected key to be a string or a number.', JSON.stringify(action));
          return state;
        }
        return state.update(key, value => updatePagination(value, action));
      }
      default:
        return state;
    }
  };
}
