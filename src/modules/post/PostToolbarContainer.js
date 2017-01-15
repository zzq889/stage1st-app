import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostToolbar from './PostToolbar';

const PostToolbarContainer = connect(
  (state, { tid, uid, pageNo = 1 }) => ({
    totalPage: state.getIn(['pagination', 'postsByTid', `${tid}.${uid}.${pageNo}`, 'totalPage']),
  }),
  // (dispatch, { tid }) => ({
  //   loadPostPage: bindActionCreators(loadPostPage.bind(null, tid), dispatch),
  // }),
)(PostToolbar);

PostToolbarContainer.propTypes = {
  tid: PropTypes.number.isRequired,
};

export default PostToolbarContainer;
