import React, { Component, PropTypes } from 'react';
import { withNavigation } from '@exponent/ex-navigation';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

@withNavigation
class DismissButton extends Component {
  _pop = () => {
    this.props.navigator.pop();
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={this._pop}
        {...this.props}
      >
        <Icon style={styles.icon} name="close" size={28} color="#fff" />
      </TouchableOpacity>
    );
  }
}

DismissButton.propTypes = {
  navigator: PropTypes.shape({
    pop: PropTypes.func.isRequired,
  }),
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    margin: 8,
    justifyContent: 'center',
  },
});

export default DismissButton;
