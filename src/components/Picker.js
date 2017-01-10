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

const MyPicker = ({ input, label, items, isExpand, toggleExpand, ...otherProps }) => {
  const currentLabel = items
    .filter(d => d.get('value') === input.value)
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
              selectedValue={input.value}
              onValueChange={val => input.onChange(val)}
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
  input: PropTypes.any,
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
