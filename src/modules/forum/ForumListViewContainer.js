import { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import ForumListView from './ForumListView';
import { subscribeForum, unsubscribeForum } from './ForumState';

const ForumListViewContainer = connect(
  (state, { forumIds }) => {
    const forums = forumIds
      .map(fid => state.getIn(['entities', 'forums', String(fid)]))
      .toList();

    return { forums };
  },
  { subscribeForum, unsubscribeForum },
)(ForumListView);

ForumListViewContainer.propTypes = {
  forumIds: PropTypes.instanceOf(List).isRequired,
};

export default ForumListViewContainer;
