import { PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import ForumListView from './ForumListView';

const ForumListViewContainer = connect(
  (state, { forumIds }) => {
    const forums = forumIds
      .map(fid => state.getIn(['entities', 'forums', String(fid)]))
      .toList();

    return { forums };
  },
)(ForumListView);

ForumListViewContainer.propTypes = {
  forumIds: PropTypes.instanceOf(List).isRequired,
};

export default ForumListViewContainer;
