import { Map } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onChange, reset } from './FormState';

const formConnect = (formName, validate) => connect(
  (state) => {
    const values = state.getIn(['form', formName], Map());
    return {
      values,
      invalid: validate ? validate(values).size > 0 : false,
    };
  },
  dispatch => ({
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
