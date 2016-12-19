import { connect } from 'react-redux';
import PostListView from './PostListView';

export default connect(
  state => ({
    // threads: state.getIn(['threads', 'pagination']),
    // loading: state.getIn(['threads', 'loading']),
  }),
)(PostListView);
