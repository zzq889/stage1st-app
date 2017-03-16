import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import PinIcon from 'react-native-vector-icons/Ionicons';
import { palette } from '../../styles/config';
import TouchableCell from '../../components/TouchableCell';

const iconMap = {
  hot: 'ios-bonfire',
  pinned: 'ios-star',
  closed: 'ios-closed',
  digest: 'ios-color-wand',
};

const ThreadRow = ({
  statusicon,
  status,
  subject,
  showForumName,
  forumName,
  type,
  author,
  timestamp,
  replies,
  onPress,
}) => (
  <TouchableCell
    style={styles.row}
    onPress={onPress}
  >
    <Text style={[styles.title, styles[status]]}>
      {iconMap[statusicon] ? <PinIcon name={iconMap[statusicon]} size={15} /> : null}
      {subject}
      {showForumName
        ? <Text style={styles.subtitle}>&nbsp;[{forumName}]</Text>
        : <Text style={styles.subtitle}>&nbsp;[{type}]</Text>}
    </Text>
    <View style={styles.content}>
      <View style={styles.iconText}>
        <Icon name="user" size={13} color={palette.grey} />
        <Text style={styles.detail}>{author}</Text>
      </View>
      <View style={styles.iconText}>
        <Icon name="speech" size={13} color={palette.grey} />
        <Text style={styles.detail}>{replies}</Text>
      </View>
      <View style={styles.iconText}>
        <Icon name="clock" size={13} color={palette.grey} />
        <Text style={styles.detail}>{Moment().from(Moment.unix(timestamp))}</Text>
      </View>
    </View>
  </TouchableCell>
);

ThreadRow.propTypes = {
  statusicon: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  status: PropTypes.string,
  showForumName: PropTypes.bool,
  forumName: PropTypes.string,
  type: PropTypes.string,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  replies: PropTypes.string.isRequired,
  // views: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  row: {
    padding: 15,
  },
  hot: {
    color: palette.orange,
  },
  pined: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 17,
    color: palette.foreground,
  },
  subtitle: {
    fontSize: 16,
    color: palette.default,
  },
  detail: {
    color: palette.default,
    marginLeft: 5,
  },
  iconText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ThreadRow;
