import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavigationStyles } from '@exponent/ex-navigation';
import LoginView from './LoginView';
import { palette } from '../../styles/config';
import DismissButton from '../../components/DismissButton';

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

  render() {
    return <LoginView {...this.props} onSubmit={s => console.warn(s)} />;
  }
}

export default connect()(LoginViewContainer);
