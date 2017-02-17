import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommentComposeView from './CommentComposeView';
import { newComment } from './NewsState';
import formConnect from '../form/formConnect';

export default formConnect('commentComposeForm')(connect(
  () => ({}),
  (dispatch, {
    navigation: { state: { params: { postId } } },
    values,
  }) => ({
    onSubmit: bindActionCreators(
      newComment.bind(null, { postId, ...values.toJS() }),
      dispatch,
    ),
  }),
)(CommentComposeView));
