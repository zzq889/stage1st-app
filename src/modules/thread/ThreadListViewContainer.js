import { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ThreadListView from './ThreadListView';
import { loadThreadPage } from './ThreadState';

const ThreadListViewContainer = connect(
  (state, { fid }) => {
    const forumName = state.getIn(['entities', 'forums', String(fid), 'name']);
    return {
      threads: state
        .getIn(['pagination', 'threadsById', fid, 'ids'], List())
        .map(tid => state
          .getIn(['entities', 'threads', String(tid)])
          .set('forumName', forumName))
        .toList(),
      loading: state.getIn(['pagination', 'threadsById', fid, 'isFetching']),
    };
  },
  (dispatch, { fid }) => ({
    loadThreadPage: bindActionCreators(loadThreadPage.bind(null, fid), dispatch),
  }),
)(ThreadListView);

ThreadListViewContainer.propTypes = {
  fid: PropTypes.number.isRequired,
};

export default ThreadListViewContainer;
