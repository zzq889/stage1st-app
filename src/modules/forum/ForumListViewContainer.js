import { connect } from 'react-redux';
import ForumListView from './ForumListView';
import { loadForumPage } from './ForumState';

export default connect(
  (state) => {
    const forumIds = state.getIn(['pagination', 'forumsByFid'], []);
    const forumEntities = state.getIn(['entities', 'forums'], {});
    const forums = forumIds.map(fid => forumEntities[fid]);
    return { forums };
  }, {
    loadForumPage,
  },
)(ForumListView);
