import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Moment from 'moment';
import { palette } from '../../styles/config';
import HtmlView from '../../components/HtmlView';
import Avatar from '../../components/Avatar';

const PostHistoryRow = ({
  subject,
  message,
  position,
  author,
  authorId,
  timestamp,
  type,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.row}
    onPress={onPress}
  >
    <Text style={styles.subject}>{`[${type}] ${subject}`}</Text>
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Avatar style={styles.avatar} uid={authorId} />
        <View style={styles.headerText}>
          <View style={styles.rowOne}>
            <Text style={styles.title}>{author}</Text>
            <Text style={styles.position}>{`#${position}`}</Text>
          </View>
          <Text style={styles.detail}>{Moment().from(Moment.unix(timestamp))}</Text>
        </View>
      </View>
      {message ? (
        <HtmlView
          style={styles.content}
          value={message}
          margin={60}
        />
      ) : null}
    </View>
  </TouchableOpacity>
);

PostHistoryRow.propTypes = {
  subject: PropTypes.string.isRequired,
  message: PropTypes.string,
  position: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  row: {
    margin: 15,
  },
  subject: {
    fontSize: 16,
    marginBottom: 10,
  },
  wrapper: {
    padding: 15,
    backgroundColor: palette.background,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.mint3,
    borderStyle: 'solid',
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
