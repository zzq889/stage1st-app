import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LoginView from './LoginView';
import { palette } from '../../styles/config';

class LoginContainer extends PureComponent {
  static route = {
    navigationBar: {
      title: 'Login',
      backgroundColor: palette.black,
      tintColor: palette.inverted,
    },
    styles: {
      gestures: null,
    },
  }

  render() {
    return <LoginView {...this.props} onSubmit={s => console.warn(s)} />;
  }
}

export default connect()(LoginContainer);
