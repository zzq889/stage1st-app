import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { getConfiguration } from '../../utils/configuration';
import PreImage from '../../../images/pre.png';
import { palette } from '../../styles/config';
import CircleView from '../../components/CircleView';

export default class AboutView extends Component {
  static route = {
    navigationBar: {
      title: ({ title }) => title || 'About',
    },
  }

  render() {
    const appName = getConfiguration('APP_NAME');
    const site = getConfiguration('SITE');
    const version = getConfiguration('VERSION');
    const company = getConfiguration('COMPANY');
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <CircleView size={200} source={PreImage} style={styles.image} />
          <Text style={styles.title}>{appName}</Text>
          <Text style={styles.text}>{site}</Text>
          <Text style={styles.text}>版本号: {version}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.bottomText}>{company}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    marginBottom: 10,
  },
  bottom: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    color: palette.grey,
  },
  image: {
    marginBottom: 20,
  },
});
