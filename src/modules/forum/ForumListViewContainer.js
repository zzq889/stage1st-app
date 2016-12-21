import { connect } from 'react-redux';
import { List } from 'immutable';
import ForumListView from './ForumListView';
import { loadForumPage } from './ForumState';

export default connect(
  (state) => {
    const forums = state
      .getIn(['pagination', 'forumsByFid', 'root', 'ids'], List())
      .map(fid => state.getIn(['entities', 'forums', String(fid)]))
      .toList();

    return { forums };
  }, {
    loadForumPage,
  },
)(ForumListView);
