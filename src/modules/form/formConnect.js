import { Map } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleSubmit, onChange, reset } from './FormState';

const formConnect = (formName, validate) => connect(
  (state) => {
    const values = state.getIn(['form', formName, 'values'], Map());
    const submitting = state.getIn(['form', formName, 'submitting'], false);
    return {
      values,
      submitting,
      invalid: validate ? validate(values).size > 0 : false,
    };
  },
  dispatch => ({
    handleSubmit: bindActionCreators(
      handleSubmit.bind(null, formName),
      dispatch,
    ),
    onChange: bindActionCreators(
      onChange.bind(null, formName),
      dispatch,
    ),
    reset: bindActionCreators(
      reset.bind(null, formName),
      dispatch,
    ),
  }),
);

export default formConnect;
