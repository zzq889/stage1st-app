/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react';
import {
  Image,
  View,
  StyleSheet,
} from 'react-native';
import { palette } from '../styles/config';

const CircleView = ({ style, ...props }) => {
  const styles = getStyles(props);
  return (
    <View style={[styles.container, style]}>
      <Image
        style={[styles.image, style]}
        {...props}
      />
      <View style={styles.fixCircleClipping} />
    </View>
  );
};

CircleView.propTypes = {
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
    image: {
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

export default CircleView;
