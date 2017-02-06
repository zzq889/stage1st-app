import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class ComposeButton extends Component {
  gotoComposeView = () => {
    this.props.navigation
    .navigate('NewThread', { fid: this.props.fid });
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={this.gotoComposeView}
      >
        <Icon style={styles.icon} name="ios-create-outline" size={28} color="#fff" />
      </TouchableOpacity>
    );
  }
}

ComposeButton.propTypes = {
  fid: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
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

export default ComposeButton;
