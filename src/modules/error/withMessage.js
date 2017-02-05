import React, { PropTypes, PureComponent } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { defaultAlertStyle } from '../../styles/config';
import { errorEmitter } from './ErrorState';

function getDisplayName(WrappedComponent): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withMessage(WrappedComponent) {
  class InnerComponent extends PureComponent {
    // componentWillMount() {
    //   this._subscription = errorEmitter.addListener('error', this.listener);
    // }

    // componentWillUnmount() {
    //   this._subscription.remove();
    // }

    // listener = error => this.props.navigator.showLocalAlert(error, defaultAlertStyle);

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  // InnerComponent.propTypes = {
  //   navigator: PropTypes.shape({
  //     showLocalAlert: PropTypes.func.isRequired,
  //   }).isRequired,
  // };

  InnerComponent.displayName = `WithMessage(${getDisplayName(WrappedComponent)})`;

  return hoistStatics(InnerComponent, WrappedComponent);
}
