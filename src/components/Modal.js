import React, { PropTypes, PureComponent } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { palette } from '../styles/config';

const MODAL_HEIGHT = 250;
const PADDING_BOTTOM = 20;

export default class MXModal extends PureComponent {
  state = {
    visible: false,
  };

  componentWillMount() {
    this.setState({ visible: this.props.visible });
    const value = this.props.visible ? 1 : 0;
    this.animatedValue = new Animated.Value(value);
    this.slideInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-MODAL_HEIGHT, -PADDING_BOTTOM],
    });
  }

  componentWillReceiveProps({ visible: nextVisible }) {
    if (this.props.visible !== nextVisible) {
      if (nextVisible) {
        this.setState({ visible: true });
        Animated.spring(this.animatedValue, {
          toValue: 1,
        }).start();
      } else {
        Animated.timing(this.animatedValue, {
          toValue: 0,
          duration: 300,
        }).start((/* { finished }*/) => {
          if (!nextVisible) {
            this.setState({ visible: false });
          }
        });
      }
    }
  }

  render() {
    const { style, children, ...props } = this.props;
    const overlayAnimatedStyle = {
      opacity: this.animatedValue,
    };
    const modalAnimatedStyle = {
      marginBottom: this.slideInterpolate,
    };

    return (
      <Modal
        animationType={'none'}
        transparent
        {...props}
        visible={this.state.visible}
      >
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback
              style={styles.touchable}
              onPress={this.props.onRequestClose}
            >
              <Animated.View style={[styles.overlay, overlayAnimatedStyle]} />
            </TouchableWithoutFeedback>
            <Animated.View style={[styles.modal, modalAnimatedStyle]}>
              <View style={style}>
                {children}
              </View>
            </Animated.View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  }
}

MXModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node,
  style: PropTypes.number,
  onRequestClose: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchable: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    height: MODAL_HEIGHT,
    backgroundColor: palette.background,
    paddingBottom: PADDING_BOTTOM,
  },
});
