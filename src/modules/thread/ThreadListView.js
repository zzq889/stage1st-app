import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  InteractionManager,
} from 'react-native';
import { List } from 'immutable';
import { withNavigation } from '@exponent/ex-navigation';
import ImmutableListView from 'react-native-immutable-list-view';
import ComposeButton from '../../components/ComposeButton';
import Row from './ThreadRow';
import Router from '../AppRouter';
import TitleView from '../../components/TitleView';

@withNavigation
class ThreadListView extends Component {
  static route = {
    navigationBar: {
      renderRight: ({ params: { fid } }) => <ComposeButton fid={fid} />,
      renderTitle: ({ params }) => <TitleView {...params} />,
    },
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.loadThreadPage();
    });
  }

  componentWillReceiveProps({ loading }) {
    if (loading !== this.props.loading) {
      this.props.navigator.updateCurrentRouteParams({
        loading,
      });
    }
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
    const { threads } = this.props;
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
  threads: PropTypes.instanceOf(List).isRequired,
  loading: PropTypes.bool,
  loadThreadPage: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    getNavigator: PropTypes.func.isRequired,
  }),
  navigator: PropTypes.shape({
    updateCurrentRouteParams: PropTypes.func.isRequired,
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
