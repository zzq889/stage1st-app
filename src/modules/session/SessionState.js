import { Map } from 'immutable';
import { REHYDRATE } from 'redux-persist-immutable/constants';

// Initial state
const initialState = Map({ isReady: false });

// Reducer
export default function SessionStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case REHYDRATE:
      return state.set('isReady', true);

    default:
      return state;
  }
}
