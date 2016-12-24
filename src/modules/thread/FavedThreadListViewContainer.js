import { List } from 'immutable';
import { connect } from 'react-redux';
import ThreadListView from './ThreadListView';
import { loadThreadPage } from './ThreadState';

const FavedThreadListViewContainer = connect(
  state => ({
    threads: state
      .getIn(['pagination', 'threadsByFid', 'fav', 'ids'], List())
      .map((tid) => {
        const thread = state.getIn(['entities', 'threads', String(tid)]);
        const fid = thread.get('fid');
        const forumName = state.getIn(['entities', 'forums', String(fid), 'name']);
        return thread.set('forumName', forumName);
      })
      .toList(),
  }),
  {
    loadThreadPage,
  },
)(ThreadListView);

export default FavedThreadListViewContainer;
