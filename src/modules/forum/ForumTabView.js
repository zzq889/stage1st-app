import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  SlidingTabNavigation,
  SlidingTabNavigationItem,
} from '@exponent/ex-navigation';
import ForumListViewContainer from './ForumListViewContainer';
import withMessage from '../../components/withMessage';

@withMessage
export default class ForumTabView extends Component {
  static route = {
    navigationBar: {
      title: '论坛',
      ...SlidingTabNavigation.navigationBarStyles,
    },
  }

  componentWillMount() {
    this.props.loadChannelPage();
  }

  _renderLabel = ({ route }) => {
    const title = this.props.channels.getIn([route.key, 'name']);
    return <Text style={styles.tabLabel}>{title}</Text>;
  };

  render() {
    const { channels } = this.props;

    if (channels.size < 2) {
      return <View />;
    }

    const channelsElement = channels.toList().map((chan) => {
      const key = String(chan.get('fid'));
      return (
        <SlidingTabNavigationItem key={key} id={key}>
          <ForumListViewContainer
            forumIds={chan.get('child')}
          />
        </SlidingTabNavigationItem>
      );
    });

    return (
      <SlidingTabNavigation
        id="sliding-tab-navigation"
        navigatorUID="sliding-tab-navigation"
        renderLabel={this._renderLabel}
        barBackgroundColor="#ddd"
        indicatorStyle={styles.tabIndicator}
        lazy // Hack: the lazy property must be required for ListView
      >
        {channelsElement}
      </SlidingTabNavigation>
    );
  }
}

ForumTabView.propTypes = {
  channels: PropTypes.instanceOf(Map).isRequired,
  loadChannelPage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  tabLabel: {
    margin: 8,
    fontSize: 13,
    color: '#000',
  },

  tabIndicator: {
    backgroundColor: '#000',
  },
});
