import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  InteractionManager,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { List } from 'immutable';
import { withNavigation } from '@exponent/ex-navigation';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import ImmutableListView from 'react-native-immutable-list-view';
import ComposeButton from '../../components/ComposeButton';
import Row from './ThreadRow';
import Router from '../AppRouter';
import { palette } from '../../styles/config';

@withNavigation
class ThreadListView extends Component {
  static route = {
    navigationBar: {
      title: ({ title }) => title,
      renderRight: ({ params: { fid } }) => (Number.isInteger(fid) ? <ComposeButton fid={fid} /> : null),
    },
  }

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
    this.props.loadMoreThreads();
  }

  _onRefresh = () => {
    // TODO: on refresh
  }

  handleScroll = (event) => {
    // TODO: event.nativeEvent.contentOffset.y
    console.log(event.nativeEvent.contentOffset.y);
  }

  renderFooter = () => (
    <View style={styles.footer}>
      <ActivityIndicator />
    </View>
  );

  renderRow = (rowData, sectionID, rowID, highlightRow) => (
    <Row
      subject={rowData.get('subject')}
      forumName={rowData.get('forumName')}
      author={rowData.get('author')}
      timestamp={Number(rowData.get('lastpost'))}
      status={rowData.get('statusicon')}
      replies={rowData.get('replies')}
      views={rowData.get('views')}
      onPress={() => {
        this.props.navigation
        .getNavigator('master')
        .push(Router.getRoute('posts', {
          tid: rowData.get('tid'),
          title: rowData.get('subject'),
        }));
        highlightRow(sectionID, rowID);
      }}
    />
  )

  render() {
    const { threads, loading, loadType, nextPage } = this.props;
    return (
      <ImmutableListView
        style={styles.container}
        ref={(c) => { this.listView = c; }}
        immutableData={threads}
        refreshControl={
          <RefreshControl
            refreshing={loadType === 'refresh' && loading}
            onRefresh={() => this.props.loadThreadPage('refresh')}
          />
        }
        renderRow={this.renderRow}
        renderFooter={loading ? this.renderFooter : null}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        rowsDuringInteraction={15}
        // onScroll={this.handleScroll}
        // InfiniteScrollView props
        renderScrollComponent={props => <InfiniteScrollView {...props} />}
        canLoadMore={!loading && !!nextPage}
        distanceToLoadMore={0}
        onLoadMoreAsync={this._loadMoreContentAsync}
      />
    );
  }
}

ThreadListView.propTypes = {
  threads: PropTypes.instanceOf(List).isRequired,
  nextPage: PropTypes.number,
  loadType: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loadThreadPage: PropTypes.func.isRequired,
  loadMoreThreads: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    getNavigator: PropTypes.func.isRequired,
  }),
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
