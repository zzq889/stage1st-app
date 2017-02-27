import React, { PropTypes, PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Set } from 'immutable';
import { EventEmitter } from 'fbemitter';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollTabBar from '../../components/ScrollTabBar';
import ThreadListViewContainer from './ThreadListViewContainer';
import { palette } from '../../styles/config';
import ThreadComposeButton from './ThreadComposeButton';

export const emitter = new EventEmitter();

export default class SubscribedTabView extends PureComponent {
  static navigationOptions = {
    header: (navigation, defaultHeader) => ({
      ...defaultHeader,
      right: (
        <ThreadComposeButton />
      ),
    }),
  }

  render() {
    const forums = this.props.forums.toList();

    if (forums.size < 1) {
      return <ThreadListViewContainer fid="subscribed" />;
    }

    const slides = forums.map((forum) => {
      const key = String(forum.get('fid'));
      return (
        <ThreadListViewContainer
          key={key}
          fid={key}
          tabLabel={forum.get('name')}
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
        <ThreadListViewContainer
          fid="subscribed"
          tabLabel="全部订阅"
        />
        {slides}
      </ScrollableTabView>
    );
  }
}

SubscribedTabView.propTypes = {
  forums: PropTypes.instanceOf(Set),
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.background,
  },
});
