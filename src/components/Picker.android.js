/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react';
import { List } from 'immutable';

import {
  Picker,
} from 'react-native';

const MyPicker = ({ value, onChange, label, items, ...otherProps }) => {
  const pickerItem = [];
  pickerItem.push(<Picker.Item key={-1} label={label} value={null} />);
  items.map((item) => {
    const itemLabel = item.get('label');
    const itemValue = item.get('value');
    pickerItem.push(
      <Picker.Item
        key={itemValue}
        label={itemLabel}
        value={itemValue}
      />,
    );
    return null;
  });

  return (
    <Picker
      mode="dropdown"
      selectedValue={value}
      onValueChange={val => onChange(val)}
      {...otherProps}
    >
      {pickerItem}
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
