/* eslint-disable react/prefer-stateless-function */

import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import hoistStatics from 'hoist-non-react-statics';
import { palette } from '../../styles/config';

function getDisplayName(WrappedComponent): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function requireAuth(WrappedComponent) {
  @withNavigation
  @connect(state => ({
    isLoggedIn: state.getIn(['auth', 'isLoggedIn']),
  }))
  class InnerComponent extends PureComponent {
    showLogin = () => {
      this.props.navigation.getNavigator('master').push('login');
    }

    render() {
      const { isLoggedIn, ...otherProps } = this.props;
      if (isLoggedIn) {
        return <WrappedComponent {...otherProps} />;
      }
      return (
        <View style={styles.container}>
          <Text style={styles.beforeText}>Authentication Required</Text>
          <TouchableOpacity onPress={this.showLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  InnerComponent.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      getNavigator: PropTypes.func.isRequired,
    }).isRequired,
  };

  InnerComponent.displayName = `RequireAuth(${getDisplayName(WrappedComponent)})`;

  return hoistStatics(InnerComponent, WrappedComponent);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    justifyContent: 'center',
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
  },
  buttonText: {
    color: palette.white,
  },
});
