import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import ImmutableListView from 'react-native-immutable-list-view';
import { connectActionSheet } from '@exponent/react-native-action-sheet';
import { Map, List } from 'immutable';
import TableCell from '../../components/TableCell';
import { palette } from '../../styles/config';
import ProfileHeaderContainer from './ProfileHeaderContainer';

const listData = List([
  Map({ title: '我的发言', route: 'History' }),
  Map({ title: '我的消息', route: 'Notifications' }),
  Map({ title: '我的收藏', route: 'MyFavorites', params: { fid: 'favorite' } }),
  // Map({ title: '我的马甲', route: 'color' }),
  // Map({ title: '搜索', route: 'color' }),
  Map({ title: '关于', route: 'About' }),
  Map({ title: '退出登录', name: 'logout' }),
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
            this.props.navigation
              .navigate(route, {
                title: rowData.get('title'),
                ...rowData.get('params', {}),
              });
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
      return <View style={styles.container} />;
    }

    return (
      <ImmutableListView
        style={styles.container}
        immutableData={listData}
        renderRow={this.renderRow}
        renderHeader={this.renderHeader}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

ProfileView.propTypes = {
  uid: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Map),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  userLogout: PropTypes.func.isRequired,
  showActionSheetWithOptions: PropTypes.func,
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

export default ProfileView;
