import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  InteractionManager,
} from 'react-native';
import { List } from 'immutable';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import ImmutableListView from 'react-native-immutable-list-view';
import { palette } from '../../styles/config';
import Row from './NewsRow';

class NewsListView extends Component {

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.loadNewsPage('refresh');
    });
  }

  _loadMoreContentAsync = async () => {
    // Fetch more data here.
    // After fetching data, you should update your ListView data source
    // manually.
    // This function does not have a return value.
    this.props.loadNewsPage('loadmore');
  };

  renderRow = (rowData, sectionID, rowID, highlightRow) => (
    <Row
      id={rowData.getIn(['id'])}
      title={rowData.getIn(['title', 'rendered'])}
      excerpt={rowData.getIn(['excerpt', 'rendered'])}
      timestamp={rowData.get('date')}
      imageURL={(rowData.getIn(['betterFeaturedImage', 'mediaDetails', 'sizes', 'postThumbnail', 'sourceUrl']))}
      onPress={() => {
        this.props.navigation.navigate('Article', {
          id: rowData.get('id'),
          url: rowData.get('link'),
        });
        highlightRow(sectionID, rowID);
      }}
    />
  );

  render() {
    const { news, loading, loadType, nextPage } = this.props;
    return (
      <ImmutableListView
        style={styles.container}
        immutableData={news}
        renderRow={this.renderRow}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        refreshControl={
          <RefreshControl
            refreshing={loadType === 'refresh' && loading}
            onRefresh={() => this.props.loadNewsPage('refresh')}
          />
        }
        // InfiniteScrollView props
        renderScrollComponent={props => <InfiniteScrollView {...props} />}
        canLoadMore={!loading && !!nextPage}
        distanceToLoadMore={0}
        onLoadMoreAsync={this._loadMoreContentAsync}
      />
    );
  }
}

NewsListView.propTypes = {
  news: PropTypes.instanceOf(List).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  loadNewsPage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: palette.separator,
  },
});

export default NewsListView;
