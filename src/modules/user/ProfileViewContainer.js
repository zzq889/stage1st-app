import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileView from './ProfileView';
import { loadUserPage } from './UserState';
import requireAuth from '../auth/requireAuth';
import { userLogout } from '../auth/AuthState';

const ProfileViewWrapper = connect(
  (state, { uid }) => ({
    uid,
    username: state.getIn(['auth', 'currentUser', 'username']),
    user: state.getIn(['entities', 'users', uid]),
  }),
  (dispatch, { uid }) => ({
    loadUserPage: bindActionCreators(loadUserPage.bind(null, uid), dispatch),
    userLogout: bindActionCreators(userLogout, dispatch),
  }),
)(ProfileView);

ProfileViewWrapper.propTypes = {
  uid: PropTypes.string.isRequired,
};

const ProfileViewContainer = connect(
  state => ({
    uid: state.getIn(['auth', 'currentUser', 'uid']),
  }),
)(ProfileViewWrapper);

export default requireAuth(ProfileViewContainer);
