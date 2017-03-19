import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { palette } from '../../styles/config';
import TouchableCell from '../../components/TouchableCell';

const ForumRow = ({ name, todaypostsNum, isSubscribed, onPress, onSubscribePress }) => (
  <TouchableCell
    onPress={onPress}
    style={styles.row}
    {...this.props}
  >
    <View>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>今日发表: {todaypostsNum}</Text>
    </View>
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={onSubscribePress}
    >
      {isSubscribed
        ? <Icon style={styles.icon} name="ios-heart" size={20} color={palette.red} />
        : <Icon style={styles.icon} name="ios-add" size={28} color={palette.default} />
      }
    </TouchableOpacity>
  </TouchableCell>
);

ForumRow.propTypes = {
  name: PropTypes.string.isRequired,
  todaypostsNum: PropTypes.string.isRequired,
  isSubscribed: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  onSubscribePress: PropTypes.func,
};

ForumRow.defaultProps = {
  isSubscribed: false,
};

const styles = StyleSheet.create({
  row: {
    height: 54,
    flex: 1,
    paddingLeft: 15,
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

  subtitle: {
    marginTop: 5,
    fontSize: 12,
    color: palette.underlayColor,
  },
});

export default ForumRow;
