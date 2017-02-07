import React, { PropTypes, PureComponent } from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

const MODAL_HEIGHT = 300;
const PADDING_BOTTOM = 20;

export default class PagePicker extends PureComponent {
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
      }
      Animated.spring(this.animatedValue, {
        toValue: nextVisible ? 1 : 0,
      }).start((/* { finished }*/) => {
        if (!nextVisible) {
          this.setState({ visible: false });
        }
      });
    }
  }

  render() {
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
        {...this.props}
        visible={this.state.visible}
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback
            style={styles.touchable}
            onPress={this.props.onRequestClose}
          >
            <Animated.View style={[styles.overlay, overlayAnimatedStyle]} />
          </TouchableWithoutFeedback>
          <Animated.View style={[styles.modal, modalAnimatedStyle]}>
            <Text>Modal</Text>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

PagePicker.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
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
    backgroundColor: '#fff',
    paddingBottom: PADDING_BOTTOM,
  },
});
