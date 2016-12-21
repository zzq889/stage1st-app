import React, { Component, PropTypes } from 'react';
import {
  View,
  ListView,
  StyleSheet,
} from 'react-native';
import { fromJS, is } from 'immutable';
import Router from '../AppRouter';
import Row from './ForumRow';

const forums = fromJS([
  { id: 140, name: '页游S1官方联运', subscribed: true },
  { id: 132, name: '炉石传说', subscribed: false },
  { id: 138, name: 'DOTA', subscribed: false },
  { id: 135, name: '手游页游', subscribed: false },
  { id: 111, name: '英雄联盟(LOL)', subscribed: false },
]);

class ForumListView extends Component {
  static route = {
    navigationBar: {
      title: '论坛',
    },
  }

  constructor(props, context) {
    super(props, context);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !is(r1, r2),
    });
    // Shallow convert to a JS array, leaving immutable row data.
    this.state = {
      dataSource: ds.cloneWithRows(this.props.forums.toArray()),
    };
  }

  componentWillMount() {
    this.props.loadForumPage();
  }

  renderRow = (rowData, sectionID, rowID, highlightRow) => (
    <Row
      name={rowData.get('name')}
      subscribed={rowData.get('subscribed')}
      onPress={() => {
        this.props.navigator.push(Router.getRoute('threads', { title: rowData.get('name') }));
        highlightRow(sectionID, rowID);
      }}
    />
  )

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

ForumListView.propTypes = {
  navigator: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loadForumPage: PropTypes.func.isRequired,
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
