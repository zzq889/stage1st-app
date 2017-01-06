import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { Map } from 'immutable';

class ProfileView extends Component {
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
    return (
      <View>
        <Text>{JSON.stringify(this.props.user)}</Text>
      </View>
    );
  }
}

ProfileView.propTypes = {
  // uid: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Map),
  loadUserPage: PropTypes.func.isRequired,
  navigator: PropTypes.shape({
    updateCurrentRouteParams: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileView;
