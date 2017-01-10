import { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ThreadListView from './ThreadListView';
import {
  loadThreadPage,
  loadFavedThreadPage,
  loadSubscribedThreadPage,
} from './ThreadState';

const ThreadListViewContainer = connect(
  (state, { fid }) => ({
    threads: state
      .getIn(['pagination', 'threadsById', fid, 'ids'], List())
      .map((tid) => {
        const thread = state.getIn(['entities', 'threads', String(tid)]);
        const threadFid = thread.get('fid');
        const forumName = state.getIn(['entities', 'forums', String(threadFid), 'name']);
        return thread.set('forumName', forumName);
      })
      .sortBy(post => post.get('lastpost'))
      .reverse()
      .toList(),
    loading: state.getIn(['pagination', 'threadsById', fid, 'isFetching']),
  }),
  (dispatch, { fid }) => {
    let loadThreadPageFunc;
    switch (fid) {
      case 'subscribed':
        loadThreadPageFunc = loadSubscribedThreadPage;
        break;
      case 'fav':
        loadThreadPageFunc = loadFavedThreadPage;
        break;
      default:
        loadThreadPageFunc = loadThreadPage.bind(null, fid);
    }

    return {
      loadThreadPage: bindActionCreators(loadThreadPageFunc, dispatch),
    };
  },
)(ThreadListView);

ThreadListViewContainer.propTypes = {
  fid: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default ThreadListViewContainer;
