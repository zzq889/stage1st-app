import React, { Component, PropTypes } from 'react';
import { withNavigation } from '@exponent/ex-navigation';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ImmutableListView from 'react-native-immutable-list-view';
import { List } from 'immutable';
import Icon from 'react-native-vector-icons/Ionicons';
// import * as ThreadState from './ThreadState';
import Row from './ThreadRow';
import Router from '../AppRouter';

@withNavigation
class ThreadListView extends Component {
  static route = {
    navigationBar: {
      title: ({ title }) => title || 'Threads',
      renderRight: () => (
        <TouchableOpacity style={styles.iconContainer}>
          <Icon style={styles.icon} name="ios-create-outline" size={28} color="#fff" />
        </TouchableOpacity>
      ),
    },
  }

  componentWillMount() {
    this.props.loadThreadPage(this.props.fid);
  }

  renderRow = (rowData, sectionID, rowID, highlightRow) => (
    <Row
      subject={rowData.get('subject')}
      forumName={rowData.get('forumName')}
      author={rowData.get('author')}
      timestamp={rowData.get('lastpost')}
      onPress={() => {
        this.props.navigator.push(Router.getRoute('posts', {
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
  fid: PropTypes.number.isRequired,
  threads: PropTypes.instanceOf(List).isRequired,
  loadThreadPage: PropTypes.func.isRequired,
  navigator: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

ThreadListView.defaultProps = {
  threads: List(),
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

export default ThreadListView;
