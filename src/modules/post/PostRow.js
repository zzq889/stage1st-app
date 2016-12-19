import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Moment from 'moment';
import HtmlRender from 'react-native-html-render';
import Avatar from '../../components/Avatar';

// node, index, parent, type
const renderNode = (node, index, parent, style) => {
  if (node.name === 'br') {
    return null;
  }
  if (node.name === 'text' && style === 'block') {
    const isQuote = parent && parent.name === 'blockquote';
    const quoteStyle = [styles.content, styles.inline];
    return (
      <Text
        key={index}
        style={isQuote ? quoteStyle : styles.content}
      >{node.text}
      </Text>
    );
  }
  return undefined;
};

const PostRow = ({ message, position, author, authorId, createdAt }) => (
  <View style={styles.row}>
    <View style={styles.header}>
      <Avatar style={styles.avatar} authorId={authorId} />
      <View style={styles.headerText}>
        <View style={styles.rowOne}>
          <Text style={styles.title}>{author}</Text>
          <Text style={styles.position}>{`#${position}`}</Text>
        </View>
        <Text style={styles.detail}>{Moment().from(createdAt)}</Text>
      </View>
    </View>
    <HtmlRender
      value={message}
      onLinkPress={(url) => { console.log(url); }}
      renderNode={renderNode}
    />
  </View>
);

PostRow.propTypes = {
  message: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  createdAt: React.PropTypes.instanceOf(Moment).isRequired,
};

const styles = StyleSheet.create({
  row: {
    margin: 15,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  rowOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
  },
  position: {
    color: '#888',
  },
  detail: {
    color: '#888',
    marginTop: 5,
  },
  content: {
    fontSize: 15,
    lineHeight: 15 * 1.25,
  },
  inline: {
    color: '#888',
  },
});

export default PostRow;
