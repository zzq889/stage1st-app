import { connect } from 'react-redux';
import ForumListView from './ForumListView';

export default connect(
  state => ({
    // threads: state.getIn(['threads', 'pagination']),
    // loading: state.getIn(['threads', 'loading']),
  }),
)(ForumListView);
