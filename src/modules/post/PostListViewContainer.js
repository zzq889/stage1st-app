import { PropTypes } from 'react';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostListView from './PostListView';
import { loadPostPage, jumpToPage } from './PostState';
import { loadThreadInfo, favThread } from '../thread/ThreadState';

const PostListViewContainer = connect(
  (state, { tid, navigation }) => ({
    tid: tid || (navigation && navigation.state.params.tid),
  }),
)(connect(
  (state, { tid, navigation }) => {
    const uid = state.getIn(['post', tid, 'uid']);
    const quid = uid || 'all';
    const key = `${tid}.${quid}`;
    const currentPageNo = (navigation && navigation.state.params.pageNo)
      || state.getIn(['post', tid, quid, 'pageNo'], 1);
    return {
      uid,
      pageNo: currentPageNo,
      highlightPosition: navigation && navigation.state.params.highlightPosition,
      posts: state
        .getIn(['pagination', 'postsByKey', key, 'pages', currentPageNo], List())
        .map(pid => state.getIn(['entities', 'posts', String(pid)]))
        .sortBy(post => post.get('position'))
        .toList(),
      thread: state.getIn(['entities', 'threads', String(tid)], Map()),
      loadType: state.getIn(['pagination', 'postsByKey', key, 'loadType']),
      loading: state.getIn(['pagination', 'postsByKey', key, 'isFetching'], false),
      totalPage: state.getIn(['pagination', 'postsByKey', key, 'totalPage']),
    };
  },
)(connect(
  () => ({}),
  (dispatch, { navigation, tid, uid, pageNo }) => ({
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
    jumpToPage: (pg) => {
      navigation.setParams({ pageNo: pg });
      dispatch(jumpToPage(tid, uid, pg));
    },
  }),
)(PostListView)));

PostListViewContainer.propTypes = {
  tid: PropTypes.number,
};

export default PostListViewContainer;
