import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostComposeView from './PostComposeView';
import { onChange } from '../form/FormState';
import { newPost } from './PostState';

const FORM_NAME = 'postComposeForm';

export default connect(
  state => ({
    content: state.getIn(['form2', FORM_NAME, 'content']),
  }),
  dispatch => ({
    onContentChange: bindActionCreators(
      onChange.bind(null, FORM_NAME, 'content'),
      dispatch,
    ),
  }),
)(connect(
  () => ({}),
  (dispatch, { tid, pid, content }) => ({
    onSubmit: bindActionCreators(
      newPost.bind(null, { tid, pid, content }),
      dispatch,
    ),
  }),
)(PostComposeView));
