import React, { PropTypes, PureComponent } from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  InteractionManager,
} from 'react-native';
import { List } from 'immutable';
import Moment from 'moment';
import Avatar from '../../components/Avatar';
import HtmlView from '../../components/HtmlView';
import { palette } from '../../styles/config';
import { newsEmitter } from './NewsState';

export default class ArticleView extends PureComponent {
  componentWillMount() {
    this._subscription = newsEmitter.addListener(
      'COMMENT_CREATION_SUCCESS', () => this.props.loadCommentsPage(this.props.id));
    InteractionManager.runAfterInteractions(() => {
      this.props.loadCommentsPage(this.props.id);
    });
  }

  componentWillUnmount() {
    this._subscription.remove();
  }

  render() {
    const { title, date, content, comments } = this.props;
    return (
      <ScrollView
        style={styles.container}
      >
        <View style={styles.article}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.detail}>{Moment(date).format('ll LT')}</Text>
          <HtmlView
            value={content}
          />
        </View>
        <View style={styles.commentContainer}>
          <View style={styles.commentHeader}>
            <Button
              style={styles.composeButton}
              title={'写留言'}
              color={palette.primary}
              onPress={() => {
                this.props.navigation.navigate('NewComment', { postId: this.props.id });
              }}
            />
          </View>
          {comments.map(comment => (
            <View key={comment.get('id')} style={styles.commentRow}>
              <Avatar style={styles.avatar} uid={'0'} />
              <View style={styles.commentContent}>
                <Text style={styles.author}>{comment.get('authorName')}</Text>
                <HtmlView
                  stylesheet={{ text: { color: palette.black, fontSize: 16 } }}
                  value={comment.getIn(['content', 'rendered'])}
                />
                <Text style={styles.timestamp}>
                  {Moment().from(Moment(comment.get('date')))}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

ArticleView.propTypes = {
  id: PropTypes.string.isRequired,
  // url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  comments: PropTypes.instanceOf(List),
  loadCommentsPage: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

ArticleView.defaultProps = {
  comments: List([1, 2]),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.mint2,
  },
  article: {
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 30,
    backgroundColor: palette.background,
  },
  title: {
    fontSize: 20,
    lineHeight: 25,
    color: palette.foreground,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    color: palette.deepMint,
    marginBottom: 30,
  },
  content: {
    height: 200,
  },
  commentContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: palette.deepMint,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  commentHeader: {
    padding: 15,
  },
  commentRow: {
    marginBottom: 15,
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 10,
  },
  author: {
    fontSize: 16,
    color: palette.transGrey,
  },
  timestamp: {
    color: palette.deepMint,
  },
});
