import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { getConfiguration } from '../../utils/configuration';
import PreImage from '../../../images/pre.png';
import { palette } from '../../styles/config';

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
          <View style={styles.imageContainer}>
            <Image source={PreImage} style={styles.image} />
            <View style={styles.fixCircleClipping} />
          </View>
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

const size = 200;
const circleFixBorder = size * 0.5;

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
  imageContainer: {
    width: size,
    height: size,
    borderRadius: size * 0.5,
    overflow: 'hidden',
    backgroundColor: palette.lightGrey,
    marginBottom: 20,
  },
  image: {
    width: size,
    height: size,
  },
  fixCircleClipping: {
    position: 'absolute',
    top: -circleFixBorder,
    bottom: -circleFixBorder,
    right: -circleFixBorder,
    left: -circleFixBorder,
    borderRadius: (size * 0.5) + (circleFixBorder * 0.5),
    borderWidth: circleFixBorder,
    borderColor: palette.background,
  },
});
