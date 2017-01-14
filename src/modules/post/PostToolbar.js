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


const PostToolbar = ({ pageCount }) => (
  <Toolbar style={styles.container}>
    <BarButtonItem disabled>
      <Icon style={styles.icon} name="chevron-thin-left" size={20} color={palette.lightGrey} />
    </BarButtonItem>
    <BarButtonItem style={styles.tabItem} stretch>
      <Text>1 / {pageCount}</Text>
    </BarButtonItem>
    <BarButtonItem>
      <Icon style={styles.icon} name="chevron-thin-right" size={20} color={palette.black} />
    </BarButtonItem>
    <View style={styles.separator} />
    <BarButtonItem>
      <Icon style={styles.icon} name="reply" size={20} color={palette.black} />
    </BarButtonItem>
  </Toolbar>
);

PostToolbar.propTypes = {
  pageCount: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  tabItem: {
    borderColor: palette.lightGrey,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
  },
  separator: {
    marginTop: 10,
    marginBottom: 10,
    width: StyleSheet.hairlineWidth,
    backgroundColor: palette.lightGrey,
  },
});

export default PostToolbar;
