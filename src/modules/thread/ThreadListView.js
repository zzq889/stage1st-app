import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  InteractionManager,
} from 'react-native';
import { List } from 'immutable';
import { withNavigation } from '@exponent/ex-navigation';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import ImmutableListView from 'react-native-immutable-list-view';
import ComposeButton from '../../components/ComposeButton';
import Row from './ThreadRow';
import Router from '../AppRouter';

@withNavigation
class ThreadListView extends Component {
  static route = {
    navigationBar: {
      title: ({ title }) => title,
      renderRight: ({ params: { fid } }) => <ComposeButton fid={fid} />,
    },
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.loadThreadPage();
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

  renderRow = (rowData, sectionID, rowID, highlightRow) => (
    <Row
      subject={rowData.get('subject')}
      forumName={rowData.get('forumName')}
      author={rowData.get('author')}
      timestamp={rowData.get('lastpost')}
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
    const { threads, loading, nextPage } = this.props;
    return (
      <ImmutableListView
        immutableData={threads}
        renderRow={this.renderRow}
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

ThreadListView.propTypes = {
  threads: PropTypes.instanceOf(List).isRequired,
  nextPage: PropTypes.number,
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
  },
  centered: {
    flex: 1,
    alignSelf: 'center',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default ThreadListView;
