import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProfileHeader from './ProfileHeader';
import { userSign } from './UserState';

const ProfileHeaderContainer = connect(
  state => ({
    isSigned: state.getIn(['auth', 'isSigned']),
    isSigning: state.getIn(['auth', 'isSigning']),
  }),
  (dispatch, { uid }) => ({
    userSign: bindActionCreators(userSign.bind(null, uid), dispatch),
  }),
)(ProfileHeader);

ProfileHeaderContainer.propTypes = {
  uid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default ProfileHeaderContainer;
