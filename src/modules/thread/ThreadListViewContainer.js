import { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import ThreadListView from './ThreadListView';
import { loadThreadPage } from './ThreadState';

const ThreadListViewContainer = connect(
  (state, { fid }) => {
    const threads = state
      .getIn(['pagination', 'threadsByFid', fid, 'ids'], List())
      .map(tid => state.getIn(['entities', 'threads', String(tid)]))
      .toList();

    return {
      threads,
    };
  },
  {
    loadThreadPage,
  },
)(ThreadListView);

ThreadListViewContainer.propTypes = {
  fid: PropTypes.number.isRequired,
};

export default ThreadListViewContainer;
