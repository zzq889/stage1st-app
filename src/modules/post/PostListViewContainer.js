import { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import PostListView from './PostListView';
import { loadPostPage } from './PostState';

const PostListViewContainer = connect(
  (state, { tid }) => ({
    posts: state
      .getIn(['pagination', 'postsByTid', tid, 'ids'], List())
      .map(pid => state.getIn(['entities', 'posts', String(pid)]))
      .sortBy(post => post.get('position'))
      .toList(),
    thread: state.getIn(['entities', 'threads', String(tid)]),
    loading: state.getIn(['pagination', 'postsByTid', tid, 'isFetching']),
  }),
  {
    loadPostPage,
  },
)(PostListView);

PostListViewContainer.propTypes = {
  tid: PropTypes.number.isRequired,
};

export default PostListViewContainer;
