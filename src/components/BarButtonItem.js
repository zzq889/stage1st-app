import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import timer from 'react-native-timer';

class ToolbarItem extends React.Component {
  constructor() {
    super();
    this.debounce.bind(this);
  }

  componentWillUnmount() {
    timer.clearTimeout(this);
  }

  debounce(fnc, delay) {
    let timeout = null;
    return (...args) => {
      if (timeout) {
        timer.clearTimeout(this);
      }
      timeout = timer.setTimeout(this, 'debounce', () => {
        fnc.apply(this, args);
      }, delay);
    };
  }

  render() {
    const { style, stretch, children, onPress, ...props } = this.props;
    return (
      <TouchableOpacity
        hitSlop={{ left: 10, right: 10, top: 0, bottom: 0 }}
        style={stretch ? [styles.container, styles.stretch] : styles.container}
        onPress={this.debounce(onPress, 200)}
        {...props}
      >
        <View style={[styles.tabItem, style]}>
          {children}
        </View>
      </TouchableOpacity>
    );
  }
}

ToolbarItem.propTypes = {
  style: PropTypes.number,
  children: PropTypes.node,
  stretch: PropTypes.bool,
  onPress: PropTypes.func,
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
