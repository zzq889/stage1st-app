import React, { PropTypes, Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const DEFAULT_TAB_BAR_HEIGHT = 45;

export default class Toolbar extends Component {
  static defaultHeight = DEFAULT_TAB_BAR_HEIGHT;

  render() {
    const height = this.props.height || DEFAULT_TAB_BAR_HEIGHT;
    return (
      <View style={[styles.container, { height }]}>
        <View style={[styles.innerContainer, this.props.style]}>
          <View style={styles.itemContainer}>
            {this.props.children}
          </View>
        </View>
      </View>
    );
  }
}

Toolbar.propTypes = {
  height: PropTypes.number,
  style: PropTypes.number,
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  innerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopColor: '#b2b2b2',
    backgroundColor: '#fefefe',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
