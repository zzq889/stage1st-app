import { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import PostListView from './PostListView';
import { loadPostPage } from './PostState';

const PostListViewContainer = connect(
  (state, { tid }) => {
    const posts = state
      .getIn(['pagination', 'postsByTid', tid, 'ids'], List())
      .map(pid => state.getIn(['entities', 'posts', String(pid)]))
      .toList();

    return {
      posts,
    };
  },
  {
    loadPostPage,
  },
)(PostListView);

PostListViewContainer.propTypes = {
  tid: PropTypes.number.isRequired,
};

export default PostListViewContainer;
