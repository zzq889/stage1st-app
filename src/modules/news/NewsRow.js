import React, { PropTypes } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import HtmlView from '../../components/HtmlView';
import { palette } from '../../styles/config';
import TouchableCell from '../../components/TouchableCell';

const NewsRow = ({ id, title, excerpt, onPress }) => (
  <TouchableCell
    onPress={onPress}
    style={styles.row}
    {...this.props}
  >
    <Text style={styles.text}>{__DEV__ ? `[${id}] ${title}` : title}</Text>
    <HtmlView
      stylesheet={htmlStyles}
      value={excerpt}
    />
  </TouchableCell>
);

NewsRow.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

NewsRow.defaultProps = {
  isSubscribed: false,
};

const htmlStyles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: palette.deepMint,
  },
});

const styles = StyleSheet.create({
  row: {
    flex: 1,
    padding: 15,
  },
  text: {
    fontSize: 17,
    color: palette.foreground,
    marginBottom: 5,
  },
});

export default NewsRow;
