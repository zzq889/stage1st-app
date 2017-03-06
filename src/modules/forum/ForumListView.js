import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { List } from 'immutable';
import ImmutableListView from 'react-native-immutable-list-view';
import { palette } from '../../styles/config';
import Row from './ForumRow';

class ForumListView extends Component {
  renderRow = (rowData, sectionID, rowID, highlightRow) => (
    <Row
      name={rowData.get('name')}
      onPress={() => {
        this.props.navigation.navigate('Threads', {
          fid: rowData.get('fid'),
          title: rowData.get('name'),
        });
        highlightRow(sectionID, rowID);
      }}
      isSubscribed={rowData.get('isSubscribed')}
      onSubscribePress={() => {
        const fid = rowData.get('fid');
        if (rowData.get('isSubscribed')) {
          this.props.unsubscribeForum(fid);
        } else {
          this.props.subscribeForum(fid);
        }
      }}
    />
  )

  render() {
    return (
      <ImmutableListView
        style={styles.container}
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
    navigate: PropTypes.func.isRequired,
  }),
  subscribeForum: PropTypes.func.isRequired,
  unsubscribeForum: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: palette.separator,
  },
});

export default ForumListView;
