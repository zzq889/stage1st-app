import { Map } from 'immutable';
import { createAction } from '../../utils/actionHelper';

/** ****************************************************************************/
/** ***************************** Actions *************************************/
/** ****************************************************************************/
const CHANGE = 'FormState/CHANGE';
const RESET = 'FormState/RESET';
const RESET_ALL = 'FormState/RESET_ALL';
const SUBMIT = 'FormState/SUBMIT';
const RESET_SUBMIT = 'FormState/RESET_SUBMIT';

export const handleSubmit = form =>
  createAction(SUBMIT, { form });

export const resetSubmit = form =>
  createAction(RESET_SUBMIT, { form });

export const onChange = (form, key, value) =>
  createAction(CHANGE, { form, key, value });

export const reset = form =>
  createAction(RESET, { form });

export const resetAll = () =>
  createAction(RESET_ALL);


/** ****************************************************************************/
/** ***************************** REDUCERS *************************************/
/** ****************************************************************************/
const initialState = Map();

export default function FormStateReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT: {
      const { form } = action;
      return state.setIn([form, 'submitting'], true);
    }
    case RESET_SUBMIT: {
      const { form } = action;
      return state.setIn([form, 'submitting'], false);
    }
    case CHANGE: {
      const { form, key, value } = action;
      return state.setIn([form, 'values', key], value);
    }
    case RESET: {
      const { form } = action;
      return state.set(form, initialState);
    }
    case RESET_ALL:
      return initialState;
    default:
      return state;
  }
}
