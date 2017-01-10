import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import ImmutableListView from 'react-native-immutable-list-view';
import { connectActionSheet } from '@exponent/react-native-action-sheet';
import { Map, fromJS } from 'immutable';
import TableCell from '../../components/TableCell';
import Router from '../AppRouter';
import ProfileHeaderContainer from './ProfileHeaderContainer';
import { palette } from '../../styles/config';

const listData = fromJS([
  { title: '我的发言', route: 'color' },
  { title: '我的消息', route: 'color' },
  { title: '我的收藏', route: 'color' },
  { title: '我的马甲', route: 'color' },
  { title: '搜索', route: 'color' },
  { title: '关于', route: 'about' },
  { title: '退出登录', name: 'logout' },
]);

@connectActionSheet
class ProfileView extends Component {
  logout = () => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['Logout', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;
    this.props.showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        this.props.userLogout();
      }
    });
  }

  renderHeader = () => (
    <View>
      <ProfileHeaderContainer
        uid={this.props.uid}
        user={this.props.user}
      />
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
        onPress={this.logout}
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
  user: PropTypes.instanceOf(Map),
  navigator: PropTypes.shape({
    push: PropTypes.func.isRequired,
    updateCurrentRouteParams: PropTypes.func.isRequired,
  }).isRequired,
  userLogout: PropTypes.func.isRequired,
  showActionSheetWithOptions: PropTypes.func,
};

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: palette.separator,
  },
});

export default ProfileView;
