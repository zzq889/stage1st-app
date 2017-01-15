import { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostListView from './PostListView';
import { loadPostPage, jumpToPage } from './PostState';
import withMessage from '../error/withMessage';

const PostListViewContainer = connect(
  (state, { tid }) => {
    const uid = state.getIn(['post', tid, 'uid'], 'all');
    const pageNo = state.getIn(['post', tid, 'pageInfo', uid, 'pageNo'], 1);
    return {
      uid,
      pageNo,
      posts: state
        .getIn(['pagination', 'postsByTid', `${tid}.${uid}`, 'pages', pageNo], List())
        .map(pid => state.getIn(['entities', 'posts', String(pid)]))
        .sortBy(post => post.get('position'))
        .toList(),
      thread: state.getIn(['entities', 'threads', String(tid)]),
      loading: state.getIn(['pagination', 'postsByTid', `${tid}.${uid}`, 'isFetching']),
      totalPage: state.getIn(['pagination', 'postsByTid', `${tid}.${uid}`, 'totalPage']),
    };
  },
)(connect(
  () => ({}),
  (dispatch, { tid, uid, pageNo }) => ({
    loadPostPage: bindActionCreators(
      loadPostPage.bind(null, tid, uid, pageNo),
      dispatch,
    ),
    jumpToPage: bindActionCreators(
      jumpToPage.bind(null, tid, uid),
      dispatch,
    ),
  }),
)(PostListView));

PostListViewContainer.propTypes = {
  tid: PropTypes.number.isRequired,
};

export default withMessage(PostListViewContainer);
