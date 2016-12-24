import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from '@exponent/ex-navigation';
import hoistStatics from 'hoist-non-react-statics';

function getDisplayName(WrappedComponent): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withMessage(WrappedComponent) {
  @withNavigation
  @connect(state => ({
    errorMessage: state.get('errorMessage'),
  }))
  class InnerComponent extends PureComponent {
    componentWillReceiveProps({ errorMessage }) {
      if (errorMessage !== this.props.errorMessage) {
        this.props.navigator.showLocalAlert(errorMessage, {
          text: { color: '#000' },
          container: { backgroundColor: '#FFEB3B' },
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  InnerComponent.propTypes = {
    errorMessage: PropTypes.string,
    navigator: PropTypes.shape({
      showLocalAlert: PropTypes.func.isRequired,
    }).isRequired,
  };

  InnerComponent.displayName = `WithMessage(${getDisplayName(WrappedComponent)})`;

  return hoistStatics(InnerComponent, WrappedComponent);
}
