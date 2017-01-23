import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import SafariView from 'react-native-safari-view';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';
import HtmlView from '../../components/HtmlView';
// import Image from '../../components/Image';
import Avatar from '../../components/Avatar';
import { getConfiguration } from '../../utils/configuration';
import { palette } from '../../styles/config';

// node, index, parent, opts, renderChild
const renderNode = (node, index) => {
  const attribs = node.attribs;

  if (node.name === 'img') {
    const isEmoji = attribs.smilieid;
    const { width: screenWidth } = Dimensions.get('window');
    const defaultSize = isEmoji ? 32 : (screenWidth - 30);
    const imgWidth = Number((attribs.width && Math.min(attribs.width, defaultSize)) || defaultSize);
    const imgHeight = Number((attribs.height && (attribs.height / attribs.width) * imgWidth) || defaultSize);

    const imgStyle = {
      width: imgWidth,
      height: imgHeight,
      backgroundColor: isEmoji ? null : palette.lightGrey,
    };

    const uri = attribs.src;
    let assembledUri = uri.match(/^\//)
      ? getConfiguration('STATIC_ROOT') + uri
      : `${getConfiguration('STATIC_ROOT')}/${uri}`;
    assembledUri = uri.match(/^http/) ? uri : assembledUri;
    // Hack for API mistake
    // related issue: https://github.com/mixslice/stage1st-app/issues/41
    assembledUri = assembledUri.replace(
      /\/attachments\/(?!forum)/, '/attachments/forum/');

    const source = {
      uri: assembledUri,
      width: imgWidth,
      height: imgHeight,
    };

    return <Image key={index} source={source} style={imgStyle} />;
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

const PostRow = ({
  message,
  position,
  author,
  authorId,
  timestamp,
  onReplyPress,
}) => (
  <View style={styles.row}>
    <View style={styles.header}>
      <Avatar style={styles.avatar} uid={authorId} />
      <View style={styles.headerText}>
        <View style={styles.rowOne}>
          <Text style={styles.title}>{author}</Text>
          <Text style={styles.position}>{`#${position}`}</Text>
        </View>
        <Text style={styles.detail}>{Moment().from(Moment.unix(timestamp))}</Text>
      </View>
    </View>
    {message ? (
      <HtmlView
        style={styles.content}
        value={message}
        renderNode={renderNode}
        onLinkPress={onLinkPress}
      />
    ) : null}
    <View style={styles.actions}>
      <TouchableOpacity
        hitSlop={{ left: 15, right: 15, top: 15, bottom: 15 }}
        onPress={onReplyPress}
      >
        <View style={styles.iconView}>
          <Icon name="reply" size={16} color={palette.secondary} />
          <Text style={styles.iconText}>回复</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

PostRow.propTypes = {
  message: PropTypes.string,
  position: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  onReplyPress: PropTypes.func,
};

const styles = StyleSheet.create({
  row: {
    padding: 15,
    backgroundColor: palette.background,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.mint3,
    borderStyle: 'solid',
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
    fontSize: 17,
    color: palette.foreground,
  },
  position: {
    color: palette.default,
  },
  detail: {
    color: palette.default,
    marginTop: 5,
  },
  actions: {
    marginTop: 15,
    alignItems: 'flex-end',
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 5,
    color: palette.secondary,
  },
});

export default PostRow;
