import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Moment from 'moment';
import HTMLView from 'react-native-htmlview';

const PostRow = ({ message, author, createdAt }) => (
  <View style={styles.row}>
    <Text style={styles.title}>{author}</Text>
    <Text style={styles.detail}>{Moment().from(createdAt)}</Text>
    <HTMLView
      value={`<p>${message}</p>`}
      stylesheet={htmlStyles}
      onLinkPress={url => console.log('clicked link: ', url)}
    />
  </View>
);

PostRow.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createdAt: React.PropTypes.instanceOf(Moment).isRequired,
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
});

const htmlStyles = StyleSheet.create({
  p: {
    fontSize: 15,
  },
  blockquote: {
    color: '#888',
  },
});

export default PostRow;
