import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Moment from 'moment';

const PostRow = ({ subject, author, updatedAt }) => (
  <View style={styles.row}>
    <Text style={styles.title}>{subject}</Text>
    <View style={styles.content}>
      <Text>{author}</Text>
      <Text>{Moment().from(updatedAt)}</Text>
    </View>
  </View>
);

PostRow.propTypes = {
  subject: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  updatedAt: React.PropTypes.instanceOf(Moment).isRequired,
};

const styles = StyleSheet.create({
  row: {
    margin: 15,
  },
  title: {
    fontSize: 16,
  },
  content: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PostRow;
