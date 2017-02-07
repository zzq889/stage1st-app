import { List } from 'immutable';
import { connect } from 'react-redux';
import NotificationsView from './NotificationsView';
import {
  loadNotificationsPage,
} from './NotificationState';

const NotificationsViewContainer = connect(
  (state, { type }) => ({
    notifications: state
      .getIn(['pagination', 'notificationsByKey', type, 'ids'], List())
      .map(pid => state.getIn(['entities', 'notifications', String(pid)]))
      .sortBy(post => post.get('dateline'))
      .reverse()
      .toList(),
    loading: state.getIn(['pagination', 'notificationsByKey', type, 'isFetching'], false),
    nextPage: state.getIn(['pagination', 'notificationsByKey', type, 'nextPage']),
  }),
  (dispatch, { type }) => ({
    loadNotificationsPage: (...args) =>
      dispatch(loadNotificationsPage(type, ...args)),
  }),
)(NotificationsView);

export default NotificationsViewContainer;
