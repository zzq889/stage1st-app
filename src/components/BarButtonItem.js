import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ToolbarItem = ({ style, stretch, disabled, children }) => (
  <TouchableOpacity
    hitSlop={{ left: 10, right: 10, top: 0, bottom: 0 }}
    style={stretch ? [styles.container, styles.stretch] : styles.container}
    disabled={disabled}
  >
    <View style={[styles.tabItem, style]}>
      {children}
    </View>
  </TouchableOpacity>
);

ToolbarItem.propTypes = {
  style: PropTypes.number,
  children: PropTypes.node,
  stretch: PropTypes.bool,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  stretch: {
    flex: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    // DEBUG only
    // borderColor: '#eee',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
});

export default ToolbarItem;
