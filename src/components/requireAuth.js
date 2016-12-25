/* eslint-disable react/prefer-stateless-function */

import React, { PropTypes, PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from '@exponent/ex-navigation';
import hoistStatics from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function requireAuth(WrappedComponent) {
  @withNavigation
  @connect(state => ({
    isLoggedIn: state.getIn(['auth', 'isLoggedIn']),
  }))
  class InnerComponent extends PureComponent {
    render() {
      const { isLoggedIn, ...otherProps } = this.props;
      if (isLoggedIn) {
        return <WrappedComponent {...otherProps} />;
      }
      return (
        <View style={styles.container}>
          <Text>Require Login</Text>
        </View>
      );
    }
  }

  InnerComponent.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    navigator: PropTypes.shape({
      performAction: PropTypes.func.isRequired,
    }).isRequired,
  };

  InnerComponent.displayName = `RequireAuth(${getDisplayName(WrappedComponent)})`;

  return hoistStatics(InnerComponent, WrappedComponent);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
