import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
  InteractionManager,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { List } from 'immutable';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import ImmutableListView from 'react-native-immutable-list-view';
import Row from './RepliesRow';
import { palette } from '../../styles/config';

class RepliesView extends Component {
  static route = {
    navigationBar: {
      title: ({ title }) => title,
    },
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.loadRepliesPage('load');
      this.initialized = true;
    });
  }

  _loadMoreContentAsync = async () => {
    // Fetch more data here.
    // After fetching data, you should update your ListView data source
    // manually.
    // This function does not have a return value.
    this.props.loadRepliesPage('loadmore');
  }

  _onRefresh = () => {
    this.props.loadRepliesPage('refresh');
  }

  renderFooter = () => (
    <View style={styles.footer}>
      <ActivityIndicator />
    </View>
  );

  renderRow = rowData => (
    <Row
      message={rowData.get('message')}
      author={rowData.get('author')}
      authorId={rowData.get('authorid')}
      timestamp={Number(rowData.get('dateline'))}
      isNew={rowData.get('new')}
    />
  )

  renderFooter = () => {
    const { notifications, loadType, loading } = this.props;
    if (loading && loadType !== 'refresh') {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
        </View>
      );
    }
    if (!loading && this.initialized && !notifications.size) {
      return (
        <View style={styles.footer}>
          <Text>暂无通知</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    const { notifications, loading, loadType, nextPage } = this.props;
    return (
      <ImmutableListView
        style={styles.container}
        immutableData={notifications}
        refreshControl={
          <RefreshControl
            refreshing={loadType === 'refresh' && loading}
            onRefresh={this._onRefresh}
          />
        }
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
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

RepliesView.propTypes = {
  notifications: PropTypes.instanceOf(List).isRequired,
  nextPage: PropTypes.number,
  loadType: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loadRepliesPage: PropTypes.func.isRequired,
};

RepliesView.defaultProps = {
  notifications: List(),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
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

export default RepliesView;
