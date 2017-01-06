import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { palette } from '../styles/config';

const TableCell = ({ text, onPress }) => (
  <TouchableHighlight
    underlayColor={palette.underlayColor}
    onPress={onPress}
  >
    <View style={styles.row} ref={(component) => { this._root = component; }} {...this.props}>
      <Text style={styles.title}>{text}</Text>
      <View style={styles.iconContainer}>
        <Icon name="ios-arrow-forward" size={20} color={palette.grey} />
      </View>
    </View>
  </TouchableHighlight>
);

TableCell.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

TableCell.defaultProps = {
  subscribed: false,
};

const styles = StyleSheet.create({
  row: {
    height: 44,
    flex: 1,
    paddingLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
});

export default TableCell;
