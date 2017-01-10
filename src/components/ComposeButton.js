import React, { Component, PropTypes } from 'react';
import { withNavigation } from '@exponent/ex-navigation';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Router from '../modules/AppRouter';

@withNavigation
class ComposeButton extends Component {
  gotoComposeView = () => {
    this.props.navigation
    .getNavigator('master')
    .push(Router.getRoute('newThread', { fid: this.props.fid }));
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
    getNavigator: PropTypes.func.isRequired,
  }),
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    flex: 1,
    margin: 8,
    justifyContent: 'center',
  },
});

export default ComposeButton;
