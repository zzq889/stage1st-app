import { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostListView from './PostListView';
import { loadPostPage } from './PostState';
import withMessage from '../error/withMessage';

const PostListViewContainer = connect(
  (state, { tid, uid, pageNo = 1 }) => ({
    posts: state
      .getIn(['pagination', 'postsByTid', `${tid}.${uid}.${pageNo}`, 'ids'], List())
      .map(pid => state.getIn(['entities', 'posts', String(pid)]))
      .sortBy(post => post.get('position'))
      .toList(),
    thread: state.getIn(['entities', 'threads', String(tid)]),
    loading: state.getIn(['pagination', 'postsByTid', tid, 'isFetching']),
  }),
  (dispatch, { tid, uid, pageNo }) => ({
    loadPostPage: bindActionCreators(
      loadPostPage.bind(null, tid, uid, pageNo),
      dispatch,
    ),
  }),
)(PostListView);

PostListViewContainer.propTypes = {
  tid: PropTypes.number.isRequired,
};

export default withMessage(PostListViewContainer);
