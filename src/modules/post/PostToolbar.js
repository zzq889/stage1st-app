import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Toolbar from '../../components/Toolbar';
import BarButtonItem from '../../components/BarButtonItem';
import { palette } from '../../styles/config';

const PostToolbar = ({
  pageNo = 0,
  totalPage = 0,
  jumpToPage,
  onReplyPress,
}) => (
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
    >
      <Text>{ pageNo } / {totalPage}</Text>
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

PostToolbar.propTypes = {
  onReplyPress: PropTypes.func,
  pageNo: PropTypes.number,
  totalPage: PropTypes.number,
  jumpToPage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  tabItem: {
    borderColor: palette.lightGrey,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
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
