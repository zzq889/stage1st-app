import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationStyles, withNavigation } from '@exponent/ex-navigation';
import DismissButton from '../../components/DismissButton';
import { palette } from '../../styles/config';

@withNavigation
class ThreadComposeView extends Component {
  static route = {
    navigationBar: {
      title: 'New Post',
      backgroundColor: palette.black,
      tintColor: palette.inverted,
      renderLeft: () => <DismissButton />,
    },
    styles: {
      ...NavigationStyles.SlideVertical,
      gestures: null,
    },
  }

  render() {
    return <View />;
  }
}

export default ThreadComposeView;
