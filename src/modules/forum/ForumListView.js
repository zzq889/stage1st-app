import React, { Component, PropTypes } from 'react';
import { withNavigation } from '@exponent/ex-navigation';
import {
  View,
  StyleSheet,
} from 'react-native';
import { List } from 'immutable';
import ImmutableListView from '../../components/ImmutableListView';

// import ImmutableDataSource from '../../components/ImmutableDataSource';
import Router from '../AppRouter';
import Row from './ForumRow';

@withNavigation
class ForumListView extends Component {
  static route = {
    navigationBar: {
      title: '论坛',
    },
  }

  _push = (route) => {
    this.props.navigation.performAction(({ stacks }) => {
      stacks('forums').push(route);
    });
  };

  renderRow = (rowData, sectionID, rowID, highlightRow) => (
    <Row
      name={rowData.get('name')}
      // subscribed={rowData.get('subscribed')}
      onPress={() => {
        this._push(Router.getRoute('threads', {
          fid: rowData.get('fid'),
          title: rowData.get('name'),
        }));
        highlightRow(sectionID, rowID);
      }}
    />
  )

  render() {
    return (
      <ImmutableListView
        immutableData={this.props.forums}
        renderRow={this.renderRow}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

ForumListView.propTypes = {
  forums: PropTypes.instanceOf(List).isRequired,
  navigation: PropTypes.shape({
    performAction: PropTypes.func.isRequired,
  }),
};

const styles = StyleSheet.create({
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

export default ForumListView;
