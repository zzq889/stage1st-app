import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import {
  View,
  StyleSheet,
  InteractionManager,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollTabBar from '../../components/ScrollTabBar';
import ForumListViewContainer from './ForumListViewContainer';
import { palette } from '../../styles/config';

export default class ForumTabView extends Component {
  static route = {
    navigationBar: {
      title: '论坛',
    },
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.loadChannelPage();
    });
  }

  render() {
    const { channels } = this.props;

    if (channels.size < 2) {
      return <View />;
    }

    const channelsElement = channels.toList().map((chan) => {
      const key = String(chan.get('fid'));
      const name = chan.get('name');
      return (
        <ForumListViewContainer
          key={key}
          forumIds={chan.get('child')}
          tabLabel={name}
          navigation={this.props.navigation}
        />
      );
    });

    return (
      <ScrollableTabView
        style={styles.container}
        renderTabBar={props => <ScrollTabBar {...props} />}
        tabBarUnderlineStyle={{ height: 2, backgroundColor: palette.primary }}
        tabBarTextStyle={{ fontSize: 15 }}
        tabBarActiveTextColor={palette.primary}
        tabBarInactiveTextColor={palette.default}
        tabBarBackgroundColor={palette.toolbar}
      >
        {channelsElement}
      </ScrollableTabView>
    );
  }
}

ForumTabView.propTypes = {
  channels: PropTypes.instanceOf(Map).isRequired,
  loadChannelPage: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.background,
  },
});
