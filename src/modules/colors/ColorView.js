import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Router from '../AppRouter';
import requireAuth from '../auth/requireAuth';

const color = () => Math.floor(360 * Math.random());

/**
 * Sample view to demonstrate navigation patterns.
 * @TODO remove this module in a live application.
 */
@requireAuth
class ColorView extends Component {
  static route = {
    navigationBar: {
      title: ({ title }) => title || 'Color Screen',
    },
  }

  state = {
    background: `hsl(${color()},50%,80%)`,
  };

  onNextPress = () => {
    const index = this.props.index;
    this.props.navigator.push(Router.getRoute('color', {
      index: index + 1,
      title: `Color Screen #${index + 1}`,
    }));
  }

  render() {
    const index = this.props.index;
    const text = `View #${index}`;
    return (
      <View style={[styles.container, { backgroundColor: this.state.background }]}>
        <Text onPress={this.onNextPress}>
          {text}
        </Text>
      </View>
    );
  }
}

ColorView.propTypes = {
  index: PropTypes.number.isRequired,
  navigator: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

ColorView.defaultProps = {
  index: 0,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ColorView;
