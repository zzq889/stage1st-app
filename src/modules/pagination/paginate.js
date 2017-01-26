import { OrderedSet, Set, Map } from 'immutable';

function getNextPage(currentPage, totalPage, pageNo, pageSize, resultSize) {
  if (!totalPage && resultSize === pageSize) {
    return pageNo + 1;
  }

  if (currentPage < totalPage) {
    return currentPage + 1;
  }
  return undefined;
}

function getTotalPage(totalCount, pageSize) {
  return (totalCount && Math.ceil(totalCount / pageSize)) || undefined;
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
    loadType: undefined,
    totalPage: undefined,
    ids: OrderedSet(),
    pages: Map(),
  }), action) {
    switch (action.type) {
      case requestType:
        return state
          .set('isFetching', true)
          .set('loadType', action.loadType);
      case successType: {
        const {
          pageNo = 1,
          response: {
            pageSize = 30,
            totalCount,
            result,
          },
        } = action;
        const resultSize = result.length;
        const totalPage = getTotalPage(totalCount, pageSize);
        const nextPage = getNextPage(pageNo, totalPage, pageNo, pageSize, resultSize);

        const newState = state
          .set('isFetching', false)
          .set('totalPage', totalPage)
          .set('nextPage', nextPage);

        if (action.refresh) {
          // clear cached pages
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
