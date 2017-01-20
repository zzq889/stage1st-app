import { Set } from 'immutable';
import { connect } from 'react-redux';
import SubscribedTabView from './SubscribedTabView';

export default connect(
  state => ({
    forums: state
      .getIn(['forum', 'subscriptions'], Set())
      .map(fid => state.getIn(['entities', 'forums', String(fid)])),
  }),
)(SubscribedTabView);
