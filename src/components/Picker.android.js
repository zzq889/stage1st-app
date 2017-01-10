/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react';
import { List } from 'immutable';

import {
  Picker,
} from 'react-native';

const MyPicker = ({ label, input, items, ...otherProps }) => {
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
      selectedValue={input.value}
      onValueChange={val => input.onChange(val)}
      {...otherProps}
    >
      {pickerItem}
    </Picker>
  );
};

MyPicker.propTypes = {
  input: PropTypes.any,
  label: PropTypes.string,
  items: PropTypes.instanceOf(List),
  isExpand: PropTypes.bool,
  toggleExpand: PropTypes.func,
};

export default MyPicker;
