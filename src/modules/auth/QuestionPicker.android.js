/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react';
import { List } from 'immutable';

import {
  View,
  Picker,
} from 'react-native';

const MyPicker = ({ style, items, ...otherProps }) => {
  return (
    <View style={style}>
      <Picker {...otherProps}>
        {
          items.toJS().map((item, idx) => (
            <Picker.Item
              key={idx}
              label={item}
              value={idx}
            />
          ))
        }

      </Picker>
    </View>
  );
};

MyPicker.propTypes = {
  items: PropTypes.instanceOf(List),
  style: PropTypes.number,
};

export default MyPicker;
