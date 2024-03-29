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
import Row from './ThreadRow';
import { palette } from '../../styles/config';

class ThreadListView extends Component {
  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.loadThreadPage('load');
    });
  }

  _loadMoreContentAsync = async () => {
    // Fetch more data here.
    // After fetching data, you should update your ListView data source
    // manually.
    // This function does not have a return value.
    this.props.loadThreadPage('loadmore');
  }

  _onRefresh = () => {
    // TODO: on refresh
  }

  handleScroll = (event) => {
    // TODO: event.nativeEvent.contentOffset.y
    // console.log(event.nativeEvent.contentOffset.y);
  }

  renderFooter = () => (
    <View style={styles.footer}>
      <ActivityIndicator />
    </View>
  );

  renderRow = (rowData, sectionID, rowID, highlightRow) => (
    <Row
      subject={rowData.get('subject')}
      showForumName={this.props.fid === 'subscribed'}
      forumName={rowData.get('forumName')}
      type={rowData.get('type')}
      author={rowData.get('author')}
      timestamp={Number(rowData.get('lastpost'))}
      status={rowData.get('statusicon')}
      replies={rowData.get('replies')}
      views={rowData.get('views')}
      statusicon={rowData.get('statusicon')}
      onPress={() => {
        this.props.navigation.navigate('Posts', {
          tid: rowData.get('tid'),
          title: rowData.get('subject'),
        });
        highlightRow(sectionID, rowID);
      }}
    />
  )

  render() {
    const { threads, loading, loadType, nextPage } = this.props;
    return (
      <ImmutableListView
        style={styles.container}
        immutableData={threads}
        refreshControl={
          <RefreshControl
            refreshing={loadType === 'refresh' && loading}
            onRefresh={() => this.props.loadThreadPage('refresh')}
            title={'...努力加载中...'}
          />
        }
        renderRow={this.renderRow}
        renderFooter={(loadType !== 'refresh' && loading) ? this.renderFooter : null}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        rowsDuringInteraction={15}
        // InfiniteScrollView props
        renderScrollComponent={props => <InfiniteScrollView {...props} />}
        canLoadMore={!loading && !!nextPage}
        distanceToLoadMore={30}
        onLoadMoreAsync={this._loadMoreContentAsync}
      />
    );
  }
}

ThreadListView.propTypes = {
  fid: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  threads: PropTypes.instanceOf(List).isRequired,
  nextPage: PropTypes.number,
  loadType: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loadThreadPage: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

ThreadListView.defaultProps = {
  threads: List(),
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

export default ThreadListView;
