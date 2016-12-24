import { Map } from 'immutable';
import { createAction } from '../../utils/actionHelper';

const RESET_ERROR_MESSAGE = 'ErrorState/RESET_ERROR_MESSAGE';

export const resetErrorMessage = () => createAction(RESET_ERROR_MESSAGE);

// Updates error message to notify about the failed fetches.
export default function errorMessage(state = Map(), action) {
  const { type, error, id } = action;

  if (type === RESET_ERROR_MESSAGE) {
    return Map();
  } else if (error) {
    return state
      .set('message', error)
      .set('id', id);
  }

  return state;
}
