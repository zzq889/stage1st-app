/* eslint-disable react/forbid-prop-types */

import React, { Component, PropTypes } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import Image from 'react-native-fit-image';
import Lightbox from 'react-native-lightbox';
import SafariView from 'react-native-safari-view';
import { getConfiguration } from '../utils/configuration';
import htmlToElement from '../utils/htmlToElement';
import { palette } from '../styles/config';

const boldStyle = { fontWeight: '500' };
const italicStyle = { fontStyle: 'italic' };
const codeStyle = { fontFamily: 'Menlo' };

const baseStyles = StyleSheet.create({
  b: boldStyle,
  strong: boldStyle,
  i: {
    ...italicStyle,
    color: palette.red,
  },
  em: italicStyle,
  pre: codeStyle,
  code: codeStyle,
  a: {
    color: palette.blue,
  },
  text: {
    fontSize: 17,
    color: palette.foreground,
  },
  br: {
    color: palette.orange,
  },
  blockquote: {
    color: palette.grey,
    backgroundColor: palette.white,
    padding: 10,
    marginBottom: 10,
  },
});

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

class HtmlView extends Component {
  constructor() {
    super();
    this.state = {
      element: null,
    };
  }

  componentWillMount() {
    this.mounted = true;
    this.startHtmlRender(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.startHtmlRender(nextProps.value);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  startHtmlRender(value) {
    if (!value) {
      this.setState({ element: null });
    }

    const opts = {
      linkHandler: this.props.onLinkPress,
      styles: Object.assign({}, baseStyles, this.props.stylesheet),
      customRenderer: this.renderNode,
    };

    htmlToElement(value, opts, (err, element) => {
      if (err) {
        this.props.onError(err);
      }

      if (this.mounted) {
        this.setState({ element });
      }
    });
  }

  // node, index, parent, opts, renderChild
  renderNode = (node, index, parent) => {
    const attribs = node.attribs;

    if (node.name === 'img') {
      const isEmoji = attribs.smilieid;
      const defaultSize = isEmoji ? 32 : null;

      const imgStyles = {
        width: defaultSize,
        height: defaultSize,
      };

      const marginBottom = { marginBottom: isEmoji ? 0 : 20 };

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
      };

      if (parent) {
        return null;
      }

      if (Platform.OS === 'ios') {
        return (
          <Lightbox key={index} style={marginBottom}>
            <Image source={source} style={imgStyles} />
          </Lightbox>
        );
      }

      return <Image key={index} source={source} style={[imgStyles, marginBottom]} />;
    }

    return undefined;
  }

  render() {
    if (this.state.element) {
      return <View>{this.state.element}</View>;
    }
    return <Text />;
  }
}

HtmlView.propTypes = {
  value: PropTypes.string,
  stylesheet: PropTypes.any,
  onLinkPress: PropTypes.func,
  onError: PropTypes.func,
};

HtmlView.defaultProps = {
  onLinkPress,
  onError: console.error.bind(console),
};

export default HtmlView;
