import React, { Component, PropTypes } from 'react';
import { Map, List } from 'immutable';
import {
  StyleSheet,
  Text,
} from 'react-native';
import {
  SlidingTabNavigation,
  SlidingTabNavigationItem,
} from '@exponent/ex-navigation';
import ThreadListViewContainer from './ThreadListViewContainer';
import withMessage from '../../components/withMessage';

@withMessage
export default class SubscribedTabView extends Component {
  static route = {
    navigationBar: {
      title: '订阅',
      ...SlidingTabNavigation.navigationBarStyles,
    },
  }

  _renderLabel = ({ route }) => {
    const title = route.key === 'subscribed'
      ? '全部'
      : this.props.forums.getIn([route.key, 'name']);
    return <Text style={styles.tabLabel}>{title}</Text>;
  };

  render() {
    const forums = List();

    if (forums.size < 2) {
      return <ThreadListViewContainer fid="subscribed" />;
    }

    const slides = forums.toList().map((forum) => {
      const key = String(forum.get('fid'));
      return (
        <SlidingTabNavigationItem key={key} id={key}>
          <ThreadListViewContainer fid={key} />
        </SlidingTabNavigationItem>
      );
    });

    return (
      <SlidingTabNavigation
        id="threadTab"
        navigatorUID="threadTab"
        renderLabel={this._renderLabel}
        barBackgroundColor="#ddd"
        indicatorStyle={styles.tabIndicator}
        lazy // Hack: the lazy property must be required for ListView
      >
        {slides}
      </SlidingTabNavigation>
    );
  }
}

SubscribedTabView.propTypes = {
  forums: PropTypes.instanceOf(Map),
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
