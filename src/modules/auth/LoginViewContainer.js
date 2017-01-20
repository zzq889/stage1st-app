import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginView from './LoginView';
import { userAuth } from './AuthState';
import formConnect from '../form/helper';

export default formConnect('loginForm')(connect(
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
