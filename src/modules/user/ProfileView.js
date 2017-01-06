import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import ImmutableListView from 'react-native-immutable-list-view';
import { Map, fromJS } from 'immutable';
import TableCell from '../../components/TableCell';
import Router from '../AppRouter';
import ProfileHeader from './ProfileHeader';
import { palette } from '../../styles/config';

const listData = fromJS([
  { title: '我的发言', route: 'color' },
  { title: '我的消息', route: 'color' },
  { title: '我的收藏', route: 'color' },
  { title: '我的马甲', route: 'color' },
  { title: '搜索', route: 'color' },
  { title: '关于', route: 'color' },
  { title: '退出登录', onPress: () => { console.warn('logout'); } },
]);

class ProfileView extends Component {
  static route = {
    navigationBar: {
      title: ({ title }) => title || '个人中心',
    },
  }

  componentWillMount() {
    this.props.loadUserPage();
    this.props.navigator.updateCurrentRouteParams({
      title: this.props.username,
    });
  }

  renderHeader = () => (
    <View>
      <ProfileHeader uid={this.props.uid} user={this.props.user} />
      <View style={styles.separator} />
    </View>
  );

  renderRow = (rowData, sectionID, rowID, highlightRow) => {
    const route = rowData.get('route');
    if (route) {
      return (
        <TableCell
          text={rowData.get('title')}
          accessoryType="arrow"
          onPress={() => {
            this.props.navigator
              .push(Router.getRoute(route, {
                tid: rowData.get('tid'),
                title: rowData.get('title'),
              }));
            highlightRow(sectionID, rowID);
          }}
        />
      );
    }
    return (
      <TableCell
        text={rowData.get('title')}
        color={palette.white}
        backgroundColor={palette.red}
        accessoryType="none"
        onPress={rowData.get('onPress')}
      />
    );
  }

  render() {
    const { user } = this.props;
    if (!user) {
      return <View />;
    }

    return (
      <ImmutableListView
        immutableData={listData}
        renderRow={this.renderRow}
        renderHeader={this.renderHeader}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        rowsDuringInteraction={30}
      />
    );
  }
}

ProfileView.propTypes = {
  uid: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Map),
  loadUserPage: PropTypes.func.isRequired,
  navigator: PropTypes.shape({
    push: PropTypes.func.isRequired,
    updateCurrentRouteParams: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: palette.separator,
  },
});

export default ProfileView;
