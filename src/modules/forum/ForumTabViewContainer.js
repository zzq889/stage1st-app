import { connect } from 'react-redux';
import { Map } from 'immutable';
import ForumTabView from './ForumTabView';
import { loadChannelPage } from './ForumState';

export default connect(
  (state) => {
    const channels = state
      .getIn(['entities', 'channels'], Map());

    return { channels };
  }, {
    loadChannelPage,
  },
)(ForumTabView);
