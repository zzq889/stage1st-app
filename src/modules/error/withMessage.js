import React, { PropTypes, PureComponent } from 'react';
import { withNavigation } from '@exponent/ex-navigation';
import hoistStatics from 'hoist-non-react-statics';
import { defaultAlertStyle } from '../../styles/config';
import { errorEmitter } from './ErrorState';

function getDisplayName(WrappedComponent): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withMessage(WrappedComponent) {
  @withNavigation
  class InnerComponent extends PureComponent {
    componentWillMount() {
      errorEmitter.on('error', this.listener);
    }

    componentWillUnmount() {
      errorEmitter.removeListener('error', this.listener);
    }

    listener = error => this.props.navigator.showLocalAlert(error, defaultAlertStyle);

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  InnerComponent.propTypes = {
    navigator: PropTypes.shape({
      showLocalAlert: PropTypes.func.isRequired,
    }).isRequired,
  };

  InnerComponent.displayName = `WithMessage(${getDisplayName(WrappedComponent)})`;

  return hoistStatics(InnerComponent, WrappedComponent);
}
