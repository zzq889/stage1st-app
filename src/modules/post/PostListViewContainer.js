import { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
  (dispatch, { tid }) => ({
    loadPostPage: bindActionCreators(loadPostPage.bind(null, tid), dispatch),
  }),
)(PostListView);

PostListViewContainer.propTypes = {
  tid: PropTypes.number.isRequired,
};

export default PostListViewContainer;
