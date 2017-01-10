import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavigationStyles } from '@exponent/ex-navigation';
import LoginView from './LoginView';
import { palette } from '../../styles/config';
import DismissButton from '../../components/DismissButton';
import { userAuth, authEmitter } from './AuthState';

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
    this._subscription = authEmitter.once('dismiss', this.dismiss);
  }

  componentWillUnmount() {
    this._subscription.remove();
  }

  dismiss = () => {
    this.props.navigator.pop();
  }

  render() {
    return (
      <LoginView
        onSubmit={data => this.props.userAuth(data.toJS())}
        {...this.props}
      />
    );
  }
}

LoginViewContainer.propTypes = {
  userAuth: PropTypes.func.isRequired,
  navigator: PropTypes.shape({
    pop: PropTypes.func.isRequired,
  }),
};

export default connect(
  () => ({}),
  { userAuth },
)(LoginViewContainer);
