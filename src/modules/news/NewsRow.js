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
    <View style={styles.imageWrapper}>
      <Image style={styles.thumbnail} source={imageURL ? { uri: imageURL } : require('../../../images/pepperoni.png')} />
    </View>
    <View style={styles.row}>
      <Text style={styles.title} numberOfLines={2}>
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
    fontSize: 12,
    color: palette.deepMint,
    alignSelf: 'flex-end',
  },
});

const styles = StyleSheet.create({
  coloums: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: 'row',
  },
  imageWrapper: {
    flex: 4,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    // borderRadius: 0,
  },
  thumbnail: {
    width: 110,
    height: 75,
  },
  row: {
    flex: 8,
    padding: 10,
  },
  title: {
    flex: 2,
    fontSize: 18,
    color: palette.foreground,
    marginBottom: 5,
  },
});

export default NewsRow;
