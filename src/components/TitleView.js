import React, { PropTypes } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { palette } from '../styles/config';

const TitleView = ({ title, loading = false }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
    {
      loading
      ? <ActivityIndicator color={palette.white} style={styles.indicator} />
      : null
    }
  </View>
);

TitleView.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: palette.white,
    alignSelf: 'center',
  },
});

export default TitleView;
