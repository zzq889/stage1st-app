import { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostListView from './PostListView';
import { loadPostPage, jumpToPage } from './PostState';
import { loadThreadInfo, favThread } from '../thread/ThreadState';
import withMessage from '../error/withMessage';

const PostListViewContainer = connect(
  (state, { tid }) => {
    const uid = state.getIn(['post', tid, 'uid']);
    const queryUid = uid || 'all';
    const pageNo = state.getIn(['post', tid, queryUid, 'pageNo'], 1);
    return {
      uid,
      pageNo,
      posts: state
        .getIn(['pagination', 'postsByTid', `${tid}.${queryUid}`, 'pages', pageNo], List())
        .map(pid => state.getIn(['entities', 'posts', String(pid)]))
        .sortBy(post => post.get('position'))
        .toList(),
      thread: state.getIn(['entities', 'threads', String(tid)]),
      loadType: state.getIn(['pagination', 'postsByTid', `${tid}.${queryUid}`, 'loadType']),
      loading: state.getIn(['pagination', 'postsByTid', `${tid}.${queryUid}`, 'isFetching'], false),
      totalPage: state.getIn(['pagination', 'postsByTid', `${tid}.${queryUid}`, 'totalPage']),
    };
  },
)(connect(
  () => ({}),
  (dispatch, { tid, uid, pageNo }) => ({
    loadThreadInfo: bindActionCreators(
      loadThreadInfo.bind(null, tid),
      dispatch,
    ),
    favThread: bindActionCreators(
      favThread.bind(null, tid),
      dispatch,
    ),
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
