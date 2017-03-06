import React, { PropTypes } from 'react';
import timer from 'react-native-timer';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { palette } from '../styles/config';

class TouchableCell extends React.Component{
  constructor(){
    super();
    this.debounce.bind(this);
  }

  componentWillUnmount() {
    timer.clearTimeout(this);
  }

  debounce(fnc, delay) {
    let timeout = null;
    return (...args) => {
      if(timeout){
        timer.clearTimeout(this);
      }
      timeout = timer.setTimeout(this, 'debounce', fnc, delay);
    }
  }

  render() {
    const { style, backgroundColor, children, onPress, ...props } = this.props;
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.row, backgroundColor && { backgroundColor }, style]}
          delayPressIn={30}
          onPress = {this.debounce(onPress, 230)}
          {...props}
        >
          {children}
        </TouchableOpacity>
      </View>

    );
  }
}

TouchableCell.propTypes = {
  style: PropTypes.number,
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.underlayColor,
  },
  row: {
    flex: 1,
    backgroundColor: palette.background,
  },
});

export default TouchableCell;
