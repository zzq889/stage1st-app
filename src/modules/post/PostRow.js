import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';
import HtmlView from '../../components/HtmlView';
// import Image from '../../components/Image';
import Avatar from '../../components/Avatar';
import { palette } from '../../styles/config';

class PostRow extends Component {
  state = {
    showsUserDetail: false,
  }

  toggleUserDetail = () => {
    this.setState({
      showsUserDetail: !this.state.showsUserDetail,
    });
  }

  render() {
    const {
      message,
      position,
      author,
      authorId,
      grouptitle,
      e,
      timestamp,
      onReplyPress,
    } = this.props;
    return (
      <View style={styles.row}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.toggleUserDetail}>
            <Avatar style={styles.avatar} uid={authorId} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <View style={styles.rowOne}>
              <Text style={styles.title}>{author}</Text>
              <Text style={styles.position}>{`#${position}`}</Text>
            </View>
            {
              this.state.showsUserDetail
              ? <Text style={styles.detail}>{`等级: ${grouptitle} / 战斗力: ${e}`}</Text>
              : <Text style={styles.detail}>{Moment().from(Moment.unix(timestamp))}</Text>
            }
          </View>
        </View>
        {message ? (
          <HtmlView
            style={styles.content}
            value={message}
          />
        ) : null}
        <View style={styles.actions}>
          <TouchableOpacity
            hitSlop={{ left: 15, right: 15, top: 15, bottom: 15 }}
            onPress={onReplyPress}
          >
            <View style={styles.iconView}>
              <Icon name="reply" size={16} color={palette.secondary} />
              <Text style={styles.iconText}>回复</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

PostRow.propTypes = {
  message: PropTypes.string,
  position: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  grouptitle: PropTypes.string.isRequired,
  e: PropTypes.number.isRequired,
  onReplyPress: PropTypes.func,
};

const styles = StyleSheet.create({
  row: {
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

export default PostRow;
