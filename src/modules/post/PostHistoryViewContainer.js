import { List } from 'immutable';
import { connect } from 'react-redux';
import PostHistoryView from './PostHistoryView';
import {
  loadPostHistoryPage,
} from './PostState';

const PostHistoryViewContainer = connect(
  (state) => {
    const paginationKey = 'history';
    return {
      posts: state
        .getIn(['pagination', 'postsByKey', paginationKey, 'ids'], List())
        .map(pid => state.getIn(['entities', 'posts', String(pid)]))
        .sortBy(post => post.get('dateline'))
        .reverse()
        .toList(),
      loading: state.getIn(['pagination', 'postsByKey', paginationKey, 'isFetching'], false),
      nextPage: state.getIn(['pagination', 'postsByKey', paginationKey, 'nextPage']),
    };
  },
  { loadPostPage: loadPostHistoryPage },
)(PostHistoryView);

export default PostHistoryViewContainer;
