import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileView from './ProfileView';
import { loadUserPage } from './UserState';
import requireAuth from '../auth/requireAuth';
import { userLogout } from '../auth/AuthState';

@connect(
  state => ({
    uid: state.getIn(['auth', 'currentUser', 'uid']),
  }),
)
@connect(
  (state, { uid }) => ({
    uid,
    username: state.getIn(['auth', 'currentUser', 'username']),
    user: state.getIn(['entities', 'users', uid]),
  }),
  (dispatch, { uid }) => ({
    loadUserPage: bindActionCreators(loadUserPage.bind(null, uid), dispatch),
    userLogout: bindActionCreators(userLogout, dispatch),
  }),
)
class ProfileViewContainer extends Component {
  static route = {
    navigationBar: {
      title: ({ title }) => title || '个人中心',
    },
  }

  componentWillMount() {
    this.props.loadUserPage();
    this.props.navigator.updateCurrentRouteParams({
      title: this.props.username,
    });
  }

  render() {
    return <ProfileView {...this.props} />;
  }
}

ProfileViewContainer.propTypes = {
  loadUserPage: PropTypes.func,
  username: PropTypes.string,
  navigator: PropTypes.shape({
    updateCurrentRouteParams: PropTypes.func.isRequired,
  }),
};

export default requireAuth(ProfileViewContainer);
