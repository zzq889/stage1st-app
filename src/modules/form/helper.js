import { Map } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onChange, reset } from './FormState';

const formConnect = formName => connect(
  state => ({
    values: state.getIn(['form2', formName], Map()),
  }),
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
