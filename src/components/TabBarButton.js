import React, { PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabBarButton = ({
  text,
  action,
  isSelected,
}) => (
  <TouchableOpacity
    onPress={action}
    style={[styles.button, isSelected && styles.selected]}
  >
    <Icon name="caret-down" size={20} color="#000" /><Text>{text}</Text>
  </TouchableOpacity>
);

TabBarButton.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: 'yellow',
  },
});

export default TabBarButton;
