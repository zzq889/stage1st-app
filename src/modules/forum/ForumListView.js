import React, { Component, PropTypes } from 'react';
import {
  View,
  ListView,
  StyleSheet,
} from 'react-native';
import { List, is } from 'immutable';
import Router from '../AppRouter';
import Row from './ForumRow';

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
      dataSource: ds.cloneWithRows(props.forums.toArray()),
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
        enableEmptySections
      />
    );
  }
}

ForumListView.propTypes = {
  forums: PropTypes.instanceOf(List).isRequired,
  navigator: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loadForumPage: PropTypes.func.isRequired,
};

ForumListView.defaultProps = {
  forums: List(),
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
