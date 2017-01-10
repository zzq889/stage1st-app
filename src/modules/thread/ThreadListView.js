import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { List } from 'immutable';
import { withNavigation } from '@exponent/ex-navigation';
import ImmutableListView from 'react-native-immutable-list-view';
import ComposeButton from '../../components/ComposeButton';
import Row from './ThreadRow';
import Router from '../AppRouter';

@withNavigation
class ThreadListView extends Component {
  static route = {
    navigationBar: {
      title: ({ title }) => title || 'Threads',
      renderRight: ({ params: { fid } }) => <ComposeButton fid={fid} />,
    },
  }

  componentWillMount() {
    this.props.loadThreadPage();
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
    const { threads, loading } = this.props;
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }
    return (
      <ImmutableListView
        immutableData={threads}
        renderRow={this.renderRow}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        rowsDuringInteraction={30}
      />
    );
  }
}

ThreadListView.propTypes = {
  // fid: PropTypes.oneOfType([
  //   PropTypes.number,
  //   PropTypes.string,
  // ]).isRequired,
  threads: PropTypes.instanceOf(List).isRequired,
  loading: PropTypes.bool,
  loadThreadPage: PropTypes.func.isRequired,
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
