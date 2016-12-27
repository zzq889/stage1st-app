import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { List } from 'immutable';
import ImmutableListView from '../../components/ImmutableListView';
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
    const { posts, loading } = this.props;
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }
    return (
      <ImmutableListView
        immutableData={posts}
        renderRow={renderRow}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        rowsDuringInteraction={10}
      />
    );
  }
}

PostListView.propTypes = {
  tid: PropTypes.number.isRequired,
  posts: PropTypes.instanceOf(List).isRequired,
  loading: PropTypes.bool,
  loadPostPage: PropTypes.func.isRequired,
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
