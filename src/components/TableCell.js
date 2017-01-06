import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { palette } from '../styles/config';

const TableCell = ({ text, accessoryType, onPress, ...props }) => {
  const styles = getStyles(props);
  return (
    <TouchableHighlight
      underlayColor={palette.underlayColor}
      onPress={onPress}
    >
      <View style={styles.row} ref={(component) => { this._root = component; }} {...this.props}>
        <Text style={styles.title}>{text}</Text>
        <View style={styles.iconContainer}>
          {
            accessoryType === 'none'
            ? null
            : <Icon name="ios-arrow-forward" size={20} color={palette.grey} />
          }
        </View>
      </View>
    </TouchableHighlight>
  );
};

TableCell.propTypes = {
  text: PropTypes.string.isRequired,
  accessoryType: PropTypes.oneOf(['none', 'arrow']),
  onPress: PropTypes.func,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

TableCell.defaultProps = {
  subscribed: false,
};

const getStyles = ({ color, backgroundColor }) => StyleSheet.create({
  row: {
    height: 44,
    flex: 1,
    paddingLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor,
  },
  iconContainer: {
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color,
  },
});

export default TableCell;
