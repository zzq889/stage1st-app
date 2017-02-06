import { PropTypes } from 'react';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostListView from './PostListView';
import { loadPostPage, jumpToPage } from './PostState';
import { loadThreadInfo, favThread } from '../thread/ThreadState';
import withMessage from '../error/withMessage';

const PostListViewContainer = connect(
  (state, { tid, navigation }) => ({
    tid: tid || (navigation && navigation.state.params.tid),
  }),
)(connect(
  (state, { tid, pageNo }) => {
    const uid = state.getIn(['post', tid, 'uid']);
    const quid = uid || 'all';
    const key = `${tid}.${quid}`;
    const currentPageNo = pageNo || state.getIn(['post', tid, quid, 'pageNo'], 1);
    return {
      uid,
      pageNo: currentPageNo,
      posts: state
        .getIn(['pagination', 'postsByTid', key, 'pages', currentPageNo], List())
        .map(pid => state.getIn(['entities', 'posts', String(pid)]))
        .sortBy(post => post.get('position'))
        .toList(),
      thread: state.getIn(['entities', 'threads', String(tid)], Map()),
      loadType: state.getIn(['pagination', 'postsByTid', key, 'loadType']),
      loading: state.getIn(['pagination', 'postsByTid', key, 'isFetching'], false),
      totalPage: state.getIn(['pagination', 'postsByTid', key, 'totalPage']),
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
)(PostListView)));

PostListViewContainer.propTypes = {
  tid: PropTypes.number,
};

export default withMessage(PostListViewContainer);
