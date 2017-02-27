import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ComposeButton = props => (
  <TouchableOpacity
    style={styles.iconContainer}
    {...props}
  >
    <Icon
      style={styles.icon}
      name="ios-create-outline"
      size={28}
      color="#fff"
    />
  </TouchableOpacity>
);

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
