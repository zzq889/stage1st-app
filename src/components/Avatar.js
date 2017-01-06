/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react';
import {
  Image,
  View,
  StyleSheet,
} from 'react-native';
import { getConfiguration } from '../utils/configuration';
import { palette } from '../styles/config';

const STATIC_ROOT = getConfiguration('STATIC_ROOT');

const Avatar = ({ uid, style, ...props }) => {
  const styles = getStyles(props);
  const uri = uid && `${STATIC_ROOT}/uc_server/avatar.php?uid=${uid}&size=middle`;
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
  uid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.number,
  style: PropTypes.any,
};

const getStyles = ({ size = 50 }) => {
  const circleFixBorder = size * 0.5;
  return StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size * 0.5,
      overflow: 'hidden',
      backgroundColor: palette.lightGrey,
    },
    avatar: {
      width: size,
      height: size,
    },
    fixCircleClipping: {
      position: 'absolute',
      top: -circleFixBorder,
      bottom: -circleFixBorder,
      right: -circleFixBorder,
      left: -circleFixBorder,
      borderRadius: (size * 0.5) + (circleFixBorder * 0.5),
      borderWidth: circleFixBorder,
      borderColor: palette.background,
    },
  });
};

export default Avatar;
