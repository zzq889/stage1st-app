import { Map } from 'immutable';
import { combineReducers } from 'redux-loop';

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => (child ? child.get(key) : undefined);
const setImmutable = (child, key, value) => child.set(key, value);

const immutableReducers = reducers =>
  combineReducers(
    reducers,
    immutableStateContainer,
    getImmutable,
    setImmutable,
  );

export default immutableReducers;
