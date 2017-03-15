import React, { PropTypes } from 'react';
import moment from 'moment';
import {
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import HtmlView from '../../components/HtmlView';
import { palette } from '../../styles/config';
import TouchableCell from '../../components/TouchableCell';

const NewsRow = ({ id, title, excerpt, onPress, imageURL, timestamp }) => (
  <TouchableCell onPress={onPress} style={styles.coloums} {...this.props}>
    <Image style={styles.thumbnail} source={imageURL ? { uri: imageURL } : require('../../../images/pepperoni.png')} />
    <View style={styles.row}>
      <Text style={styles.title}>
        {__DEV__ ? `[${id}] ${title}` : title}
      </Text>
      <HtmlView stylesheet={htmlStyles} value={moment(timestamp).format('MM-DD-YYYY, hh:mm:ss')} />
    </View>
  </TouchableCell>
);

NewsRow.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  imageURL: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

NewsRow.defaultProps = {
  isSubscribed: false,
};

const htmlStyles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 15,
    color: palette.deepMint,
  },
});

const styles = StyleSheet.create({
  coloums: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: 'row',
  },
  row: {
    flex: 2,
    padding: 10,
  },
  title: {
    flex: 2,
    fontSize: 18,
    color: palette.foreground,
    marginBottom: 5,
  },

  thumbnail: {
    flex: 1,
    margin: 10,
    width: null,
    height: 80,
    resizeMode: 'contain',
  },
});

export default NewsRow;
