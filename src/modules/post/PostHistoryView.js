import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  InteractionManager,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { List } from 'immutable';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import ImmutableListView from 'react-native-immutable-list-view';
import Row from './PostHistoryRow';
import { palette } from '../../styles/config';

class PostHistoryView extends Component {
  static route = {
    navigationBar: {
      title: ({ title }) => title,
    },
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.loadPostPage('load');
    });
  }

  _loadMoreContentAsync = async () => {
    // Fetch more data here.
    // After fetching data, you should update your ListView data source
    // manually.
    // This function does not have a return value.
    this.props.loadPostPage('loadmore');
  }

  _onRefresh = () => {
    this.props.loadPostPage('refresh');
  }

  renderFooter = () => (
    <View style={styles.footer}>
      <ActivityIndicator />
    </View>
  );

  renderRow = (rowData, sectionID, rowID, highlightRow) => (
    <Row
      subject={rowData.get('subject')}
      message={rowData.get('message')}
      position={rowData.get('position')}
      author={rowData.get('author')}
      authorId={rowData.get('authorid')}
      timestamp={Number(rowData.get('dateline'))}
      type={rowData.get('type')}
      onPress={() => {
        this.props.navigation
        .navigate('posts', {
          tid: rowData.get('tid'),
          title: rowData.get('subject'),
          pageNo: Math.floor(rowData.get('position', 0) / 30) + 1,
        });
        highlightRow(sectionID, rowID);
      }}
    />
  )

  render() {
    const { posts, loading, loadType, nextPage } = this.props;
    return (
      <ImmutableListView
        style={styles.container}
        immutableData={posts}
        refreshControl={
          <RefreshControl
            refreshing={loadType === 'refresh' && loading}
            onRefresh={this._onRefresh}
          />
        }
        renderRow={this.renderRow}
        renderFooter={(loadType !== 'refresh' && loading) ? this.renderFooter : null}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        rowsDuringInteraction={15}
        // InfiniteScrollView props
        renderScrollComponent={props => <InfiniteScrollView {...props} />}
        canLoadMore={!loading && !!nextPage}
        distanceToLoadMore={0}
        onLoadMoreAsync={this._loadMoreContentAsync}
      />
    );
  }
}

PostHistoryView.propTypes = {
  posts: PropTypes.instanceOf(List).isRequired,
  nextPage: PropTypes.number,
  loadType: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loadPostPage: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

PostHistoryView.defaultProps = {
  posts: List(),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.mint2,
  },
  centered: {
    flex: 1,
    alignSelf: 'center',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: palette.separator,
  },
  footer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostHistoryView;
