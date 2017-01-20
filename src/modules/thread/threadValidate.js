import { Map } from 'immutable';

const validate = (values) => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {};
  if (!values.get('typeid')) {
    errors.typeid = 'Required';
  }
  if (!values.get('title')) {
    errors.title = 'Required';
  } else if (unescape(encodeURIComponent(values.get('title'))).length > 80) {
    errors.title = '不能超过80个字符';
  }
  if (!values.get('content')) {
    errors.content = 'Required';
  }
  return Map(errors);
};

export default validate;
