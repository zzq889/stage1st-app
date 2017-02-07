import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Moment from 'moment';
import { palette } from '../../styles/config';
import HtmlView from '../../components/HtmlView';
import Avatar from '../../components/Avatar';

const PostHistoryRow = ({
  message,
  author,
  authorId,
  timestamp,
  isNew,
}) => (
  <View style={isNew ? [styles.row, styles.highlightRow] : styles.row}>
    <View style={styles.header}>
      <Avatar style={styles.avatar} uid={authorId} />
      <View style={styles.headerText}>
        <Text style={styles.title}>{author}</Text>
        <Text style={styles.detail}>{Moment().from(Moment.unix(timestamp))}</Text>
      </View>
    </View>
    <View style={styles.wrapper}>
      {message ? (
        <HtmlView
          style={styles.content}
          value={message}
          margin={60}
        />
      ) : null}
    </View>
  </View>
);

PostHistoryRow.propTypes = {
  message: PropTypes.string,
  author: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  isNew: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  row: {
    margin: 15,
  },
  highlightRow: {
    backgroundColor: palette.lightYellow,
  },
  subject: {
    fontSize: 16,
    marginBottom: 10,
  },
  wrapper: {
    padding: 15,
    backgroundColor: palette.mint2,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    color: palette.foreground,
  },
  position: {
    color: palette.default,
  },
  detail: {
    color: palette.default,
    marginTop: 5,
  },
  actions: {
    marginTop: 15,
    alignItems: 'flex-end',
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 5,
    color: palette.secondary,
  },
});

export default PostHistoryRow;
