/* eslint-disable react/forbid-prop-types */

import React, { PropTypes } from 'react';
import { List } from 'immutable';

import {
  View,
  StyleSheet,
  Picker,
  TouchableOpacity,
  Text,
} from 'react-native';
import { palette } from '../styles/config';

const MyPicker = ({ value, onChange, label, items, isExpand, toggleExpand, ...otherProps }) => {
  const currentLabel = items
    .filter(d => d.get('value') === value)
    .getIn([0, 'label']);
  return (
    <View>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={toggleExpand}
      >
        <Text style={styles.pickerText}>{`${label}: ${currentLabel}`}</Text>
      </TouchableOpacity>
      {
        isExpand
        ? (
          <View>
            <View style={styles.separator} />
            <Picker
              selectedValue={value}
              onValueChange={val => onChange(val)}
              {...otherProps}
            >
              {items.map((item) => {
                const itemLabel = item.get('label');
                const itemValue = item.get('value');
                return (
                  <Picker.Item
                    key={itemValue}
                    label={itemLabel}
                    value={itemValue}
                  />
                );
              })}
            </Picker>
          </View>
        )
        : null
      }
    </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: palette.separator,
  },
  textarea: {
    flex: 1,
  },
  pickerButton: {
    height: 45,
    justifyContent: 'center',
  },
  pickerText: {
    marginLeft: 10,
    fontSize: 17,
  },
});

export default MyPicker;
