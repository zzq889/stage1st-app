import { Map } from 'immutable';
import { EventEmitter } from 'fbemitter';
import { createAction } from '../../utils/actionHelper';

const RESET_ERROR_MESSAGE = 'ErrorState/RESET_ERROR_MESSAGE';

export const errorEmitter = new EventEmitter();

export const resetErrorMessage = () => createAction(RESET_ERROR_MESSAGE);

// Updates error message to notify about the failed fetches.
export default function errorMessage(state = Map(), action) {
  const { type, error } = action;

  if (type === RESET_ERROR_MESSAGE) {
    return Map();
  } else if (error) {
    errorEmitter.emit('error', error);
    return state.set('message', error);
  }

  return state;
}
