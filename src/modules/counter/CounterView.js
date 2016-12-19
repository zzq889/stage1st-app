import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';
import * as CounterState from './CounterState';
import Router from '../AppRouter';

class CounterView extends Component {
  static route = {
    navigationBar: {
      title: 'Counter',
    },
  }

  increment = () => {
    this.props.dispatch(CounterState.increment());
  }

  reset = () => {
    this.props.dispatch(CounterState.reset());
  }

  random = () => {
    this.props.dispatch(CounterState.random());
  }

  bored = () => {
    this.props.navigator.push(Router.getRoute('color', {
      index: 0,
      title: 'Color Screen',
    }));
  }

  renderUserInfo = () => {
    if (!this.props.userName) {
      return null;
    }

    return (
      <View style={styles.userContainer}>
        <Image
          style={styles.userProfilePhoto}
          source={{
            uri: this.props.userProfilePhoto,
            width: 80,
            height: 80,
          }}
        />
        <Text style={styles.linkButton}>
          Welcome, {this.props.userName}!
        </Text>
      </View>
    );
  }

  render() {
    const loadingStyle = this.props.loading
      ? { backgroundColor: '#eee' }
      : null;

    return (
      <View style={styles.container}>

        {this.renderUserInfo()}

        <TouchableOpacity
          onPress={this.increment}
          style={[styles.counterButton, loadingStyle]}
        >
          <Text style={styles.counter}>
            {this.props.counter}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.reset}>
          <Text style={styles.linkButton}>
            Reset
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.random}>
          <Text style={styles.linkButton}>
            Random
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.bored} accessible>
          <Text style={styles.linkButton}>
            {'I\'m bored!'}
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

CounterView.propTypes = {
  counter: PropTypes.number.isRequired,
  userName: PropTypes.string,
  userProfilePhoto: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  navigator: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const circle = {
  borderWidth: 0,
  borderRadius: 40,
  width: 80,
  height: 80,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center',
  },
  counterButton: {
    ...circle,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  counter: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    padding: 5,
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5,
  },
});

export default CounterView;
