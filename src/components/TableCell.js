import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { palette } from '../styles/config';
import TouchableCell from './TouchableCell';

const TableCell = ({ text, accessoryType, ...props }) => {
  const styles = getStyles(props);
  return (
    <TouchableCell
      style={styles.row}
      {...props}
    >
      <Text style={styles.title}>{text}</Text>
      <View style={styles.iconContainer}>
        {
          accessoryType === 'none'
          ? null
          : <Icon name="ios-arrow-forward" size={20} color={palette.grey} />
        }
      </View>
    </TouchableCell>
  );
};

TableCell.propTypes = {
  text: PropTypes.string.isRequired,
  accessoryType: PropTypes.oneOf(['none', 'arrow']),
  color: PropTypes.string,
};

TableCell.defaultProps = {
  subscribed: false,
};

const getStyles = ({ color }) => StyleSheet.create({
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
    color,
  },
});

export default TableCell;
