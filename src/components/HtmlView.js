/* eslint-disable react/forbid-prop-types */

import React, { Component, PropTypes } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
} from 'react-native';
import htmlToElement from '../utils/htmlToElement';

const boldStyle = { fontWeight: '500' };
const italicStyle = { fontStyle: 'italic' };
const codeStyle = { fontFamily: 'Menlo' };

const baseStyles = StyleSheet.create({
  b: boldStyle,
  strong: boldStyle,
  i: italicStyle,
  em: italicStyle,
  pre: codeStyle,
  code: codeStyle,
  a: {
    fontWeight: '500',
    color: '#007AFF',
  },
});

class HtmlView extends Component {
  constructor() {
    super();
    this.state = {
      element: null,
    };
  }

  componentDidMount() {
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
      customRenderer: this.props.renderNode,
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

  render() {
    if (this.state.element) {
      return <Text>{this.state.element}</Text>;
    }
    return <Text />;
  }
}

HtmlView.propTypes = {
  value: PropTypes.string,
  stylesheet: PropTypes.any,
  onLinkPress: PropTypes.func,
  onError: PropTypes.func,
  renderNode: PropTypes.func,
};

HtmlView.defaultProps = {
  onLinkPress: url => Linking.openURL(url),
  onError: console.error.bind(console),
};

export default HtmlView;
