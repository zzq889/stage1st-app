import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  InteractionManager,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { List, Map } from 'immutable';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImmutableListView from 'react-native-immutable-list-view';
import { palette } from '../../styles/config';
import Row from './PostRow';
import PostToolbar from './PostToolbar';
import { postEmitter } from './PostState';

class PostListView extends Component {
  componentWillMount() {
    this._subscription = postEmitter.addListener(
      'POST_CREATION_SUCCESS', () => this.props.loadPostPage('load'));
    InteractionManager.runAfterInteractions(() => {
      this.props.loadPostPage();
      this.props.loadThreadInfo();
    });
  }

  componentWillReceiveProps({ tid: nextTid, uid: nextUid, pageNo: nextPageNo }) {
    const { tid, uid, pageNo } = this.props;
    if (nextTid !== tid || nextUid !== uid || nextPageNo !== pageNo) {
      this.scrollView.scrollTo({ y: 0, animated: false });
      InteractionManager.runAfterInteractions(() => {
        this.props.loadPostPage();
      });
    }
  }

  componentWillUnmount() {
    this._subscription.remove();
  }

  showReply = (pid) => {
    this.props.navigation
    .navigate('Reply', { tid: this.props.tid, pid });
  }

  renderRow = rowData => (
    <Row
      message={rowData.get('message')}
      position={rowData.get('position')}
      author={rowData.get('author')}
      authorId={rowData.get('authorid')}
      timestamp={rowData.get('dateline')}
      grouptitle={rowData.get('grouptitle')}
      e={rowData.get('e')}
      onReplyPress={() => this.showReply(rowData.get('pid'))}
      isHighlighted={rowData.get('position') === this.props.highlightPosition}
    />
  );

  renderHeader = () => {
    const isFav = this.props.thread.get('isFav');
    const subject = this.props.thread.get('subject');
    return (
      <View style={styles.header}>
        <View style={styles.headerTitleView}>
          <Text style={styles.headerText}>
            {__DEV__ ? `${this.props.tid}: ${subject}` : subject}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.favButton}
          hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
          onPress={() => this.props.favThread(!isFav)}
        >
          <Icon
            name={isFav ? 'star' : 'star-o'}
            size={25}
            color={palette.deepMint}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderFooter = () => (
    <View style={styles.footer}>
      <ActivityIndicator />
    </View>
  );

  render() {
    const { posts, loading, loadType, pageNo, totalPage, jumpToPage } = this.props;
    return (
      <View style={styles.container}>
        <ImmutableListView
          immutableData={posts}
          renderRow={this.renderRow}
          renderScrollComponent={props =>
            <ScrollView ref={(c) => { this.scrollView = c; }} {...props} />
          }
          refreshControl={
            <RefreshControl
              refreshing={loadType === 'refresh' && loading}
              onRefresh={() => this.props.loadPostPage('refresh')}
            />
          }
          renderHeader={this.renderHeader}
          renderFooter={(loadType !== 'refresh' && loading) ? this.renderFooter : null}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          rowsDuringInteraction={5}
        />
        <PostToolbar
          pageNo={pageNo}
          totalPage={totalPage}
          jumpToPage={jumpToPage}
          onReplyPress={() => this.showReply()}
        />
      </View>
    );
  }
}

PostListView.propTypes = {
  thread: PropTypes.instanceOf(Map).isRequired,
  posts: PropTypes.instanceOf(List).isRequired,
  tid: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  uid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  pageNo: PropTypes.number,
  highlightPosition: PropTypes.number,
  totalPage: PropTypes.number,
  loadType: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loadPostPage: PropTypes.func.isRequired,
  jumpToPage: PropTypes.func.isRequired,
  loadThreadInfo: PropTypes.func.isRequired,
  favThread: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

PostListView.defaultProps = {
  posts: List(),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.mint2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerTitleView: {
    flex: 1,
  },
  headerText: {
    fontSize: 17,
    color: palette.foreground,
  },
  favButton: {
    marginLeft: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    flex: 1,
    margin: 8,
    justifyContent: 'center',
  },
  separator: {
    flex: 1,
    height: 4,
  },
  footer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostListView;
