import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostComposeView from './PostComposeView';
import { newPost } from './PostState';
import formConnect from '../form/helper';

export default formConnect('postComposeForm')(connect(
  () => ({}),
  (dispatch, {
    navigation: { state: { params: { tid, pid } } },
    values,
  }) => ({
    onSubmit: bindActionCreators(
      newPost.bind(null, { tid, pid, ...values.toJS() }),
      dispatch,
    ),
  }),
)(PostComposeView));
