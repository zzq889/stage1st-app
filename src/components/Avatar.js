/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react';
import { getConfiguration } from '../utils/configuration';
import CircleView from './CircleView';

const STATIC_ROOT = getConfiguration('STATIC_ROOT');

const Avatar = ({ uid, ...props }) => {
  const uri = uid && `${STATIC_ROOT}/uc_server/avatar.php?uid=${uid}&size=middle`;
  return (
    <CircleView
      source={{ uri }}
      {...props}
    />
  );
};

Avatar.propTypes = {
  uid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Avatar;
