import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostToolbar from './PostToolbar';

const PostToolbarContainer = connect(
  (state, { tid }) => ({
    totalPage: state.getIn(['pagination', 'postsByTid', tid, 'totalPage']),
  }),
  // (dispatch, { tid }) => ({
  //   loadPostPage: bindActionCreators(loadPostPage.bind(null, tid), dispatch),
  // }),
)(PostToolbar);

PostToolbarContainer.propTypes = {
  tid: PropTypes.number.isRequired,
};

export default PostToolbarContainer;
