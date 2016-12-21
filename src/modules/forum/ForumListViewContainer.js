import { connect } from 'react-redux';
import ForumListView from './ForumListView';
import { loadForumPage } from './ForumState';

export default connect(
  (state) => {
    const forumIds = state.getIn(['pagination', 'forumsByFid', 'root', 'ids'], []);
    const forumEntities = state.getIn(['entities', 'forums'], {});
    const forums = forumIds.map(fid => forumEntities.get(String(fid)));
    return { forums };
  }, {
    loadForumPage,
  },
)(ForumListView);
