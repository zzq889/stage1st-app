import { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNavigationHelpers } from 'react-navigation';
import ThreadListView from './ThreadListView';
import {
  loadThreadPage,
  loadMoreThreads,
} from './ThreadState';

const ThreadListViewContainer = connect(
  (state, { fid, navigation }) => ({
    nav: state.get('nav'),
    fid: fid || (navigation && navigation.state.params.fid),
  }),
)(connect(
  (state, { fid }) => ({
    threads: state
      .getIn(['pagination', 'threadsByFid', fid, 'ids'], List())
      .map((tid) => {
        const thread = state.getIn(['entities', 'threads', String(tid)]);
        const threadFid = thread.get('fid');
        const forumName = state.getIn(['entities', 'forums', String(threadFid), 'name']);
        return thread.set('forumName', forumName);
      })
      // .sortBy((post) => {
      //   const pinned = post.get('statusicon') === 'pined';
      //   const lastpost = post.get('lastpost');
      //   return pinned ? `1.${lastpost}` : `0.${lastpost}`;
      // })
      // .reverse()
      .toList(),
    loading: state.getIn(['pagination', 'threadsByFid', fid, 'isFetching'], false),
    loadType: state.getIn(['pagination', 'threadsByFid', fid, 'loadType']),
    nextPage: state.getIn(['pagination', 'threadsByFid', fid, 'nextPage']),
  }),
  (dispatch, { fid, nav }) => ({
    loadThreadPage: bindActionCreators(loadThreadPage.bind(null, fid), dispatch),
    loadMoreThreads: bindActionCreators(loadMoreThreads.bind(null, fid), dispatch),
    navigation: addNavigationHelpers({ dispatch, state: nav }),
  }),
)(ThreadListView));

ThreadListViewContainer.propTypes = {
  fid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default ThreadListViewContainer;
