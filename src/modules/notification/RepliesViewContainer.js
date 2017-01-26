import { List } from 'immutable';
import { connect } from 'react-redux';
import RepliesView from './RepliesView';
import {
  loadRepliesPage,
} from './NotificationState';

const RepliesViewContainer = connect(
  (state) => {
    const paginationKey = 'replies';
    return {
      notifications: state
        .getIn(['pagination', 'notificationsByKey', paginationKey, 'ids'], List())
        .map(pid => state.getIn(['entities', 'notifications', String(pid)]))
        .sortBy(post => post.get('dateline'))
        .reverse()
        .toList(),
      loading: state.getIn(['pagination', 'notificationsByKey', paginationKey, 'isFetching'], false),
      nextPage: state.getIn(['pagination', 'notificationsByKey', paginationKey, 'nextPage']),
    };
  },
  { loadRepliesPage },
)(RepliesView);

export default RepliesViewContainer;
