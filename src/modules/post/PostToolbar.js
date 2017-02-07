import React, { PropTypes, PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Toolbar from '../../components/Toolbar';
import PagePicker from '../../components/PagePicker';
import BarButtonItem from '../../components/BarButtonItem';
import { palette } from '../../styles/config';

class PostToolbar extends PureComponent {
  state = {
    modalVisible: false,
  }

  _setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const {
      pageNo = 0,
      totalPage = 0,
      jumpToPage,
      onReplyPress,
    } = this.props;
    return (
      <Toolbar style={styles.container}>
        <BarButtonItem
          disabled={pageNo <= 1}
          onPress={() => jumpToPage(pageNo - 1)}
        >
          <Icon
            style={styles.icon}
            name="chevron-thin-left"
            size={20}
            color={pageNo <= 1 ? palette.lightGrey : palette.black}
          />
        </BarButtonItem>
        <BarButtonItem
          style={styles.tabItem}
          stretch
          onPress={() => this._setModalVisible(true)}
        >
          <Text>{ pageNo } / {totalPage}</Text>
          <PagePicker
            visible={this.state.modalVisible}
            onRequestClose={() => this._setModalVisible(false)}
          />
        </BarButtonItem>
        <BarButtonItem
          disabled={pageNo === totalPage}
          onPress={() => jumpToPage(pageNo + 1)}
        >
          <Icon
            style={styles.icon}
            name="chevron-thin-right"
            size={20}
            color={pageNo === totalPage ? palette.lightGrey : palette.black}
          />
        </BarButtonItem>
        <View style={styles.separator} />
        <BarButtonItem onPress={onReplyPress}>
          <Icon style={styles.icon} name="reply" size={20} color={palette.black} />
        </BarButtonItem>
      </Toolbar>
    );
  }
}

PostToolbar.propTypes = {
  onReplyPress: PropTypes.func,
  pageNo: PropTypes.number,
  totalPage: PropTypes.number,
  jumpToPage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.tabbar,
  },
  tabItem: {
    borderColor: palette.lightGrey,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: palette.white,
  },
  indicator: {
    position: 'absolute',
    left: 5,
  },
  separator: {
    marginTop: 10,
    marginBottom: 10,
    width: StyleSheet.hairlineWidth,
    backgroundColor: palette.lightGrey,
  },
});

export default PostToolbar;
