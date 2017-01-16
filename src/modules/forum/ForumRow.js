import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { palette } from '../../styles/config';

const ForumRow = ({ name, subscribed, onPress }) => (
  <TouchableHighlight
    underlayColor="#ccc"
    onPress={onPress}
  >
    <View style={styles.row} ref={(component) => { this._root = component; }} {...this.props}>
      <Text style={styles.title}>{name}</Text>
      <TouchableOpacity style={styles.iconContainer}>
        {subscribed
          ? <Icon style={styles.icon} name="ios-heart" size={20} color="#f00" />
          : <Icon style={styles.icon} name="ios-add" size={28} color="#000" />
        }
      </TouchableOpacity>
    </View>
  </TouchableHighlight>
);

ForumRow.propTypes = {
  name: PropTypes.string.isRequired,
  subscribed: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

ForumRow.defaultProps = {
  subscribed: false,
};

const styles = StyleSheet.create({
  row: {
    height: 54,
    flex: 1,
    marginLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    color: palette.foreground,
  },
});

export default ForumRow;
