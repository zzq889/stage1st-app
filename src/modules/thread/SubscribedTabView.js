import React, { Component, PropTypes } from 'react';
import { Set } from 'immutable';
import {
  StyleSheet,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ThreadListViewContainer from './ThreadListViewContainer';
import withMessage from '../error/withMessage';

@withMessage
export default class SubscribedTabView extends Component {
  static route = {
    navigationBar: {
      title: '订阅',
    },
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
      <ScrollableTabView>
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
