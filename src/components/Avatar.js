/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';
import { getConfiguration } from '../utils/configuration';

const STATIC_ROOT = getConfiguration('STATIC_ROOT');

const Avatar = ({ authorId, style, ...props }) => {
  const uri = authorId && `${STATIC_ROOT}/uc_server/avatar.php?uid=${authorId}&size=middle`;
  return (
    <Image
      style={[styles.avatar, style]}
      source={{ uri }}
      {...props}
    />
  );
};

Avatar.propTypes = {
  authorId: PropTypes.number,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
});

export default Avatar;
