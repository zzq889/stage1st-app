import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavigationStyles } from '@exponent/ex-navigation';
import LoginView from './LoginView';
import { palette } from '../../styles/config';
import DismissButton from '../../components/DismissButton';
import { authUser, authEmitter } from './AuthState';

class LoginViewContainer extends PureComponent {
  static route = {
    navigationBar: {
      title: 'Login',
      backgroundColor: palette.black,
      tintColor: palette.inverted,
      renderLeft: () => <DismissButton />,
    },
    styles: {
      ...NavigationStyles.SlideVertical,
      gestures: null,
    },
  }

  componentWillMount() {
    authEmitter.on('dismiss', this.dismissLogin);
  }

  dismissLogin = () => {
    this.props.navigation.getNavigator('master').pop();
  }

  render() {
    return (
      <LoginView
        onSubmit={data => this.props.authUser(data.toJS())}
        {...this.props}
      />
    );
  }
}

LoginViewContainer.propTypes = {
  authUser: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    getNavigator: PropTypes.func.isRequired,
  }),
};

export default connect(
  () => ({}),
  { authUser },
)(LoginViewContainer);
