import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
} from 'react-native';
import { fromJS, is } from 'immutable';
import * as ForumState from './ForumState';
import Row from '../../components/ForumRow';


const forums = fromJS([
  { id: 140, name: '页游S1官方联运', subscribed: true },
  { id: 132, name: '炉石传说', subscribed: false },
  { id: 138, name: 'DOTA', subscribed: false },
  { id: 135, name: '手游页游', subscribed: false },
  { id: 111, name: '英雄联盟(LOL)', subscribed: false },
]);

const renderRow = rowData => (
  <Row
    name={rowData.get('name')}
    subscribed={rowData.get('subscribed')}
  />
);

class ForumListView extends Component {
  static route = {
    navigationBar: {
      title: 'Forums',
    },
  }

  constructor(props, context) {
    super(props, context);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !is(r1, r2),
    });
    // Shallow convert to a JS array, leaving immutable row data.
    this.state = {
      dataSource: ds.cloneWithRows(forums.toArray()),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={renderRow}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

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
