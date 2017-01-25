/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react';
import { List } from 'immutable';

import {
  Picker,
} from 'react-native';

const MyPicker = ({ value, onChange, items, ...otherProps }) => {
  return (
    <Picker
      mode="dropdown"
      selectedValue={value}
      onValueChange={val => onChange(val)}
      {...otherProps}
    >
      {items.toJS().map((item) => {
        const itemLabel = item.label;
        const itemValue = item.value;
        return (
          <Picker.Item
            key={itemValue}
            label={itemLabel}
            value={itemValue}
          />
        );
      })}
    </Picker>
  );
};

MyPicker.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  items: PropTypes.instanceOf(List),
  isExpand: PropTypes.bool,
  toggleExpand: PropTypes.func,
};

export default MyPicker;
