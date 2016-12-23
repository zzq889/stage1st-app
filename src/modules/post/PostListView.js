import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import ImmutableListView from 'react-native-immutable-list-view';
import { List } from 'immutable';
// import * as PostState from './PostState';
import Row from './PostRow';

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
    },
  }

  componentWillMount() {
    this.props.loadPostPage(this.props.tid);
  }

  render() {
    const { posts } = this.props;
    return (
      <ImmutableListView
        immutableData={posts}
        renderRow={renderRow}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        rowsDuringInteraction={5}
      />
    );
  }
}

PostListView.propTypes = {
  tid: PropTypes.number.isRequired,
  posts: PropTypes.instanceOf(List).isRequired,
  loadPostPage: PropTypes.func.isRequired,
};

PostListView.defaultProps = {
  posts: List(),
};

const styles = StyleSheet.create({
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
});

export default PostListView;
