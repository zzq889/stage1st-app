import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

class DismissButton extends Component {
  _pop = () => {
    this.props.navigation.goBack(null);
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
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }),
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    margin: 8,
    justifyContent: 'center',
  },
});

export default DismissButton;
