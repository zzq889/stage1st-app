import { connect } from 'react-redux';
import ThreadListView from './ThreadListView';

export default connect(
  state => ({
    // threads: state.getIn(['threads', 'pagination']),
    // loading: state.getIn(['threads', 'loading']),
  }),
)(ThreadListView);
