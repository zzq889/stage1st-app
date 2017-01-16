import { Set, Map } from 'immutable';

function getNextPage(currentPage = 1, totalPage) {
  if (currentPage < totalPage) {
    return currentPage + 1;
  }
  return null;
}

function getTotalPage(totalCount) {
  return (totalCount && Math.ceil(totalCount / 30)) || 1;
}

function getLastPageSize(totalCount) {
  return totalCount % 30;
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
    totalPage: 0,
    lastPageSize: 0,
    ids: Set(),
    pages: Map(),
  }), action) {
    switch (action.type) {
      case requestType:
        return state.set('isFetching', true);
      case successType: {
        const { pageNo, totalCount, result } = action.response;
        const totalPage = getTotalPage(totalCount);
        const lastPageSize = getLastPageSize(totalCount);
        const nextPage = getNextPage(pageNo, totalPage);

        return state
          .set('isFetching', false)
          .update('ids', value => value.union(result))
          .setIn(['pages', pageNo], Set(result))
          .set('totalPage', totalPage)
          .set('nextPage', nextPage)
          .set('lastPageSize', lastPageSize);
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
          console.warn('Expected key to be a string or a number.', JSON.stringify(action));
          return state;
        }
        return state.update(key, value => updatePagination(value, action));
      }
      default:
        return state;
    }
  };
}
