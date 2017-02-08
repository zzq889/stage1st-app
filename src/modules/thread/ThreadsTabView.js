import React, { PureComponent, PropTypes } from 'react';
import {
  StyleSheet,
  InteractionManager,
} from 'react-native';
import { List } from 'immutable';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { palette } from '../../styles/config';
import ThreadListViewContainer from '../thread/ThreadListViewContainer';
import ScrollTabBar from '../../components/ScrollTabBar';
import ComposeButton from '../../components/ComposeButton';

export default class ThreadsTabView extends PureComponent {
  static navigationOptions = {
    header: (navigation, defaultHeader) => {
      const fid = navigation.state.params.fid;
      return {
        ...defaultHeader,
        right: (Number.isInteger(fid) ? <ComposeButton fid={fid} navigation={navigation} /> : null),
      };
    },
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.loadForumPage();
    });
  }

  render() {
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
        <ThreadListViewContainer fid={this.props.fid} tabLabel="全部" {...this.props} />
        {
          this.props.types.map(type => (
            <ThreadListViewContainer
              key={type.get('typeid')}
              typeid={type.get('typeid')}
              fid={this.props.fid}
              tabLabel={type.get('type')}
            />
          ))
        }
      </ScrollableTabView>
    );
  }
}

ThreadsTabView.propTypes = {
  fid: PropTypes.number.isRequired,
  types: PropTypes.instanceOf(List),
  loadForumPage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.background,
  },
  tabLabel: {
    margin: 8,
    fontSize: 13,
    color: palette.foreground,
  },

  tabIndicator: {
    backgroundColor: palette.primary,
  },
});
