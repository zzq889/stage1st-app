import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { palette } from '../../styles/config';

const ThreadRow = ({ status, subject, forumName, author, timestamp, onPress }) => (
  <TouchableHighlight
    underlayColor="#ccc"
    onPress={onPress}
    style={styles[status]}
  >
    <View style={styles.row}>
      <Text style={styles.title}>
        {subject}
        {
          forumName
          ? <Text style={styles.subtitle}>&nbsp;[{forumName}]</Text>
          : null
        }
      </Text>
      <View style={styles.content}>
        <View style={styles.iconText}>
          <Icon name="md-person" size={15} color="#888" />
          <Text style={styles.detail}>{author}</Text>
        </View>
        <View style={styles.iconText}>
          <Icon name="md-time" size={15} color="#888" />
          <Text style={styles.detail}>{Moment().from(Moment.unix(timestamp))}</Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

ThreadRow.propTypes = {
  subject: PropTypes.string.isRequired,
  status: PropTypes.string,
  forumName: PropTypes.string,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  row: {
    margin: 15,
  },
  hot: {
    backgroundColor: palette.lightYellow,
  },
  pined: {
    backgroundColor: palette.lightBlue,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  detail: {
    color: '#888',
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
