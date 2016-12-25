import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from '@exponent/ex-navigation';
import hoistStatics from 'hoist-non-react-statics';
import { resetErrorMessage } from '../modules/error/ErrorState';

function getDisplayName(WrappedComponent): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const alertStyle = {
  text: { color: '#000' },
  container: { backgroundColor: '#FFEB3B' },
  duration: 1000,
};

export default function withMessage(WrappedComponent) {
  @withNavigation
  @connect(state => ({
    errorId: state.getIn(['error', 'id']),
    errorMessage: state.getIn(['error', 'message']),
  }), {
    resetErrorMessage,
  })
  class InnerComponent extends PureComponent {
    componentWillReceiveProps({ errorId, errorMessage }) {
      if (errorId !== this.props.errorId) {
        this.props.navigator.showLocalAlert(errorMessage, alertStyle);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  InnerComponent.propTypes = {
    errorId: PropTypes.string,
    errorMessage: PropTypes.string,
    // resetErrorMessage: PropTypes.func.isRequired,
    navigator: PropTypes.shape({
      showLocalAlert: PropTypes.func.isRequired,
    }).isRequired,
  };

  InnerComponent.displayName = `WithMessage(${getDisplayName(WrappedComponent)})`;

  return hoistStatics(InnerComponent, WrappedComponent);
}
