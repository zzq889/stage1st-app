import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const color = () => Math.floor(360 * Math.random());

/**
 * Sample view to demonstrate navigation patterns.
 * @TODO remove this module in a live application.
 */
class ColorView extends Component {
  state = {
    background: `hsl(${color()},50%,80%)`,
  };

  onNextPress = () => {
    const { state: { params } } = this.props.navigation;
    const index = (params ? params.index : 0) + 1;
    this.props.navigation.navigate('Color', { index });
    // this.props.navigator.push(Router.getRoute('color', {
    //   index: index + 1,
    //   title: `Color Screen #${index + 1}`,
    // }));
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.background }]}>
        <Text onPress={this.onNextPress}>
          {'View'}
        </Text>
      </View>
    );
  }
}

ColorView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        index: PropTypes.number.isRequired,
      }),
    }).isRequired,
  }).isRequired,
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
