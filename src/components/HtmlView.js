/* eslint-disable react/forbid-prop-types */

import React, { Component, PropTypes } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
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
  renderNode = (node, index) => {
    const attribs = node.attribs;
    const margin = this.props.margin || 30;

    if (node.name === 'img') {
      const isEmoji = attribs.smilieid;
      const { width: screenWidth } = Dimensions.get('window');
      const defaultSize = isEmoji ? 32 : (screenWidth - margin);
      const imgWidth = Number((attribs.width && Math.min(attribs.width, defaultSize)) || defaultSize);
      const imgHeight = Number((attribs.height && (attribs.height / attribs.width) * imgWidth) || defaultSize);

      const imgStyle = {
        width: imgWidth,
        height: imgHeight,
        backgroundColor: isEmoji ? null : palette.mint2,
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
  margin: PropTypes.number,
};

HtmlView.defaultProps = {
  onLinkPress,
  onError: console.error.bind(console),
};

export default HtmlView;
