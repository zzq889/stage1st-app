import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Dimensions,
} from 'react-native';
import SafariView from 'react-native-safari-view';
import Moment from 'moment';
import entities from 'entities';
import HtmlView from '../../components/HtmlView';
import Image from '../../components/Image';
import Avatar from '../../components/Avatar';
import { getConfiguration } from '../../utils/configuration';

// node, index, parent, opts, renderChild
const renderNode = (node, index, parent, opts, renderChild) => {
  const attribs = node.attribs;

  if (node.type === 'text') {
    return (
      <Text key={index} style={parent ? opts.styles[parent.name] : styles.content}>
        {entities.decodeHTML(node.data)}
      </Text>
    );
  } else if (node.name === 'br') {
    return null;
  } else if (node.attribs && node.attribs.class === 'quote') {
    return <Text key={index} style={[styles.content, styles.quote]}>{renderChild()}{'\n'}</Text>;
  } else if (node.name === 'img') {
    const { width: screenWidth } = Dimensions.get('window');
    const defaultSize = attribs.smilieid ? 32 : (screenWidth - 30);
    const imgWidth = Number(attribs.width || attribs['data-width'] || defaultSize);
    const imgHeight = Number(attribs.height || attribs['data-height'] || defaultSize);

    const imgStyle = {
      width: imgWidth,
      height: imgHeight,
    };

    const uri = attribs.src;
    const assembledUri = uri.match(/^\//)
      ? getConfiguration('STATIC_ROOT') + uri
      : `${getConfiguration('STATIC_ROOT')}/${uri}`;

    const source = {
      uri: uri.match(/^http/) ? uri : assembledUri,
      width: imgWidth,
      height: imgHeight,
    };

    if (attribs.smilieid) {
      return <Image key={index} source={source} style={imgStyle} />;
    }

    return (
      <Text key={index}>
        <Image key={index} source={source} style={{ ...imgStyle, backgroundColor: '#eee' }} />
        {`${source.uri}\n\n`}
      </Text>
    );
  }

  return undefined;
};

async function onLinkPress(url) {
  try {
    let available = true;
    try {
      await SafariView.isAvailable();
    } catch (e) {
      available = false;
    }
    if (available) {
      SafariView.show({ url });
    } else {
      Linking.openURL(url);
    }
  } catch (err) {
    console.error('An error occurred', err);
  }
}

const PostRow = ({ message, position, author, authorId, timestamp }) => (
  <View style={styles.row}>
    <View style={styles.header}>
      <Avatar style={styles.avatar} authorId={authorId} />
      <View style={styles.headerText}>
        <View style={styles.rowOne}>
          <Text style={styles.title}>{author}</Text>
          <Text style={styles.position}>{`#${position}`}</Text>
        </View>
        <Text style={styles.detail}>{Moment().from(Moment.unix(timestamp))}</Text>
      </View>
    </View>
    <HtmlView
      value={message}
      renderNode={renderNode}
      onLinkPress={onLinkPress}
    />
  </View>
);

PostRow.propTypes = {
  message: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  row: {
    margin: 15,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  rowOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  position: {
    color: '#888',
  },
  detail: {
    color: '#888',
    marginTop: 5,
  },
  content: {
    fontSize: 16,
    color: '#000',
  },
  quote: {
    color: '#888',
  },
});

export default PostRow;
