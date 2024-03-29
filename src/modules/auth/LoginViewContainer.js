import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginView from './LoginView';
import { resetAuth, userAuth } from './AuthState';
import formConnect from '../form/formConnect';
import { authValidate } from './authValidate';

export default formConnect('loginForm', authValidate)(connect(
  state => ({
    isSubmitting: state.getIn(['auth', 'isSubmitting']),
  }),
  (dispatch, { values }) => ({
    onSubmit: bindActionCreators(
      userAuth.bind(null, values.toJS()),
      dispatch,
    ),
    resetAuth: () => dispatch(resetAuth()),
  }),
)(LoginView));
