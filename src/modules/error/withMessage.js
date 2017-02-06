import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { MessageBarManager, MessageBar } from 'react-native-message-bar';
import hoistStatics from 'hoist-non-react-statics';
import { errorEmitter } from './ErrorState';
import { palette, keyboardVerticalOffset } from '../../styles/config';

function getDisplayName(WrappedComponent): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withMessage(WrappedComponent) {
  class InnerComponent extends PureComponent {
    componentDidMount() {
      MessageBarManager.registerMessageBar(this.alert);
      this._subscription = errorEmitter.addListener('error', this.listener);
    }

    componentWillUnmount() {
      this._subscription.remove();
      MessageBarManager.unregisterMessageBar();
    }

    listener = (error) => {
      MessageBarManager.showAlert({
        message: error,
        alertType: 'error',
        viewTopOffset: keyboardVerticalOffset,
        animationType: 'SlideFromLeft',
        durationToShow: 200,
        durationToHide: 200,
        stylesheetError: { backgroundColor: palette.red, strokeColor: palette.red },
      });
    };

    render() {
      return (
        <View style={{ flex: 1, backgroundColor: palette.background }}>
          <WrappedComponent {...this.props} />
          <MessageBar ref={(c) => { this.alert = c; }} />
        </View>
      );
    }
  }

  InnerComponent.displayName = `WithMessage(${getDisplayName(WrappedComponent)})`;

  return hoistStatics(InnerComponent, WrappedComponent);
}
