import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Moment from 'moment';

const ThreadRow = ({ subject, author, updatedAt, onPress }) => (
  <TouchableHighlight
    underlayColor="#ccc"
    onPress={onPress}
  >
    <View style={styles.row}>
      <Text style={styles.title}>{subject}</Text>
      <View style={styles.content}>
        <Text style={styles.detail}>{author}</Text>
        <Text style={styles.detail}>{Moment().from(updatedAt)}</Text>
      </View>
    </View>
  </TouchableHighlight>
);

ThreadRow.propTypes = {
  subject: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  updatedAt: PropTypes.instanceOf(Moment).isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  row: {
    margin: 15,
  },
  title: {
    fontSize: 16,
  },
  detail: {
    color: '#888',
  },
  content: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ThreadRow;
