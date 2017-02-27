import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegisterView from './RegisterView';
import { resetAuth, userRegister } from './AuthState';
import formConnect from '../form/formConnect';
import { registerValidate } from './authValidate';

export default formConnect('registerForm', registerValidate)(connect(
  state => ({
    isSubmitting: state.getIn(['auth', 'isSubmitting']),
  }),
  (dispatch, { values }) => ({
    onSubmit: bindActionCreators(
      userRegister.bind(null, values.toJS()),
      dispatch,
    ),
    resetAuth: () => dispatch(resetAuth()),
  }),
)(RegisterView));
