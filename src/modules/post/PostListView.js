import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  InteractionManager,
} from 'react-native';
import { List, Map } from 'immutable';
import ImmutableListView from 'react-native-immutable-list-view';
import { palette } from '../../styles/config';
import Row from './PostRow';
import PostToolbarContainer from './PostToolbarContainer';
import TitleView from '../../components/TitleView';

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
      renderTitle: ({ params: { loading } }) => <TitleView title="Posts" loading={loading} />,
      backgroundColor: palette.black,
      tintColor: palette.inverted,
    },
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.loadPostPage();
    });
  }

  componentWillReceiveProps({ loading }) {
    if (loading !== this.props.loading) {
      this.props.navigator.updateCurrentRouteParams({
        loading,
      });
    }
  }

  renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{this.props.thread.get('subject')}</Text>
    </View>
  );

  render() {
    const { tid, posts } = this.props;
    return (
      <View style={styles.container}>
        <ImmutableListView
          immutableData={posts}
          renderRow={renderRow}
          renderHeader={this.renderHeader}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          rowsDuringInteraction={10}
        />
        <PostToolbarContainer tid={tid} />
      </View>
    );
  }
}

PostListView.propTypes = {
  tid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  thread: PropTypes.instanceOf(Map).isRequired,
  posts: PropTypes.instanceOf(List).isRequired,
  loading: PropTypes.bool,
  loadPostPage: PropTypes.func.isRequired,
  navigator: PropTypes.shape({
    updateCurrentRouteParams: PropTypes.func.isRequired,
  }),
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
});

export default PostListView;
