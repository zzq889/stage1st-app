import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  InteractionManager,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { List, Map } from 'immutable';
import ImmutableListView from 'react-native-immutable-list-view';
import { palette } from '../../styles/config';
import Row from './PostRow';
import PostToolbar from './PostToolbar';

const renderRow = rowData => (
  <Row
    message={rowData.get('message')}
    position={rowData.get('position')}
    author={rowData.get('author')}
    authorId={rowData.get('authorid')}
    timestamp={rowData.get('dateline')}
  />
);

class PostListView extends Component {
  static route = {
    navigationBar: {
      title: 'Posts',
      backgroundColor: palette.black,
      tintColor: palette.inverted,
    },
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.loadPostPage();
    });
  }

  componentWillReceiveProps({ tid: nextTid, uid: nextUid, pageNo: nextPageNo }) {
    const { tid, uid, pageNo } = this.props;
    this.scrollView.scrollTo({ y: 0, animated: false });
    if (nextTid !== tid || nextUid !== uid || nextPageNo !== pageNo) {
      InteractionManager.runAfterInteractions(() => {
        this.props.loadPostPage();
      });
    }
  }

  renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{this.props.thread.get('subject')}</Text>
    </View>
  );

  renderFooter = () => (
    <View style={styles.footer}>
      <ActivityIndicator />
    </View>
  );

  render() {
    const { posts, loading, pageNo, totalPage, jumpToPage } = this.props;
    return (
      <View style={styles.container}>
        <ImmutableListView
          immutableData={posts}
          renderRow={renderRow}
          renderScrollComponent={props =>
            <ScrollView ref={(c) => { this.scrollView = c; }} {...props} />
          }
          renderHeader={this.renderHeader}
          renderFooter={loading ? this.renderFooter : null}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          rowsDuringInteraction={5}
        />
        <PostToolbar
          pageNo={pageNo}
          totalPage={totalPage}
          jumpToPage={jumpToPage}
        />
      </View>
    );
  }
}

PostListView.propTypes = {
  thread: PropTypes.instanceOf(Map).isRequired,
  posts: PropTypes.instanceOf(List).isRequired,
  tid: PropTypes.number.isRequired,
  uid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  pageNo: PropTypes.number,
  totalPage: PropTypes.number,
  loading: PropTypes.bool,
  loadPostPage: PropTypes.func.isRequired,
  jumpToPage: PropTypes.func.isRequired,
};

PostListView.defaultProps = {
  posts: List(),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignSelf: 'center',
  },
  header: {
    padding: 15,
    backgroundColor: '#eee',
  },
  headerText: {
    fontSize: 16,
    color: '#000',
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
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  footer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostListView;
