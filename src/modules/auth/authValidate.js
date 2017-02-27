import { Map } from 'immutable';

export const registerValidate = (values) => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};
  if (!values.get('email')) {
    errors.username = 'Required';
  }
  if (!values.get('username')) {
    errors.password = 'Required';
  }
  if (!values.get('password')) {
    errors.password = 'Required';
  }
  return Map(errors);
};

export const authValidate = (values) => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};
  if (!values.get('username')) {
    errors.username = 'Required';
  }
  if (!values.get('password')) {
    errors.password = 'Required';
  }

  const qid = values.get('questionid');
  if (qid && qid !== 0 && !values.get('answer')) {
    errors.answer = 'Required';
  }
  return Map(errors);
};
