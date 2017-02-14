import React, { PropTypes } from 'react';
import {
  WebView,
} from 'react-native';

const NewsDetailView = ({ url }) => (
  <WebView source={{ url }} />
);

NewsDetailView.propTypes = {
  url: PropTypes.string.isRequired,
};

export default NewsDetailView;
