import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginView from './LoginView';
import { userAuth } from './AuthState';
import formConnect from '../form/helper';
import validate from './authValidate';

export default formConnect('loginForm', validate)(connect(
  state => ({
    submitting: state.getIn(['auth', 'isSigning']),
  }),
  (dispatch, { values }) => ({
    onSubmit: bindActionCreators(
      userAuth.bind(null, values.toJS()),
      dispatch,
    ),
  }),
)(LoginView));
