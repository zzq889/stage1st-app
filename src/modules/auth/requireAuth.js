/* eslint-disable react/prefer-stateless-function */

import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import hoistStatics from 'hoist-non-react-statics';
import { palette, rounded } from '../../styles/config';

function getDisplayName(WrappedComponent): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function requireAuth(WrappedComponent) {
  @connect(state => ({
    isLoggedIn: state.getIn(['auth', 'isLoggedIn']),
  }))
  class InnerComponent extends PureComponent {
    showLogin = () => {
      this.props.navigation.navigate('Login');
    }

    render() {
      const { isLoggedIn, ...otherProps } = this.props;
      if (isLoggedIn) {
        return <WrappedComponent {...otherProps} />;
      }
      return (
        <View style={styles.container}>
          <Text style={styles.beforeText}>该页面需要登录才能浏览</Text>
          <TouchableOpacity onPress={this.showLogin} style={styles.button}>
            <Text style={styles.buttonText}>登录</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  InnerComponent.propTypes = {
    isLoggedIn: PropTypes.bool,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  InnerComponent.displayName = `RequireAuth(${getDisplayName(WrappedComponent)})`;

  return hoistStatics(InnerComponent, WrappedComponent);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    backgroundColor: palette.tabbar,
  },
  beforeText: {
    color: palette.grey,
    marginBottom: 10,
  },
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.primary,
    ...rounded,
  },
  buttonText: {
    color: palette.white,
  },
});
