/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react';
import {
  Image,
  View,
  StyleSheet,
} from 'react-native';
import { getConfiguration } from '../utils/configuration';

const STATIC_ROOT = getConfiguration('STATIC_ROOT');

const Avatar = ({ authorId, style, ...props }) => {
  const uri = authorId && `${STATIC_ROOT}/uc_server/avatar.php?uid=${authorId}&size=middle`;
  return (
    <View style={[styles.container, style]} {...props}>
      <Image
        style={[styles.avatar, style]}
        source={{ uri }}
      />
      <View style={styles.fixCircleClipping} />
    </View>
  );
};

Avatar.propTypes = {
  authorId: PropTypes.number,
  style: PropTypes.any,
};

const circleSize = 50;
const circleFixBorder = 25;
const bgColor = '#fff';

const styles = StyleSheet.create({
  container: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize * 0.5,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  avatar: {
    width: circleSize,
    height: circleSize,
  },
  fixCircleClipping: {
    position: 'absolute',
    top: -circleFixBorder,
    bottom: -circleFixBorder,
    right: -circleFixBorder,
    left: -circleFixBorder,
    borderRadius: (circleSize * 0.5) + (circleFixBorder * 0.5),
    borderWidth: circleFixBorder,
    borderColor: bgColor,
  },
});

export default Avatar;
