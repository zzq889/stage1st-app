import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import ThreadsTabView from './ThreadsTabView';
import { loadForumPage } from '../forum/ForumState';

export default connect(
  (state, { navigation }) => {
    const fid = navigation.state.params.fid;
    const typeIds = state.getIn(['entities', 'forums', String(fid), 'types'], List());
    const types = typeIds.map(typeid => state.getIn(['entities', 'types', String(typeid)]));
    return { fid, types };
  },
  (dispatch, { navigation }) => {
    const fid = navigation.state.params.fid;
    return {
      loadForumPage: bindActionCreators(loadForumPage.bind(null, fid), dispatch),
    };
  },
)(ThreadsTabView);
