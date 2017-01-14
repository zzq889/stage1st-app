import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostToolbar from './PostToolbar';

const PostToolbarContainer = connect(
  (state, { tid }) => ({
    pageCount: Math.ceil((state.getIn(['pagination', 'postsByTid', tid, 'totalCount']) || 0) / 30),
  }),
  // (dispatch, { tid }) => ({
  //   loadPostPage: bindActionCreators(loadPostPage.bind(null, tid), dispatch),
  // }),
)(PostToolbar);

PostToolbarContainer.propTypes = {
  tid: PropTypes.number.isRequired,
};

export default PostToolbarContainer;
