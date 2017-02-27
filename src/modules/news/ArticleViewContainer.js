import { List } from 'immutable';
import { connect } from 'react-redux';
import ArticleView from './ArticleView';
import { loadCommentsPage } from './NewsState';

export default connect(
  (state, { navigation }) => {
    const id = String(navigation.state.params.id);
    return {
      id,
      url: navigation.state.params.url,
      title: state.getIn(['entities', 'articles', id, 'title', 'rendered']),
      content: state.getIn(['entities', 'articles', id, 'content', 'rendered']),
      date: state.getIn(['entities', 'articles', id, 'date']),
      comments: state
        .getIn(['pagination', 'commentsByKey', id, 'ids'], List())
        .map(commentId => state.getIn(['entities', 'comments', String(commentId)]))
        .sortBy(article => article.get('date'))
        .reverse()
        .toList(),
    };
  },
  { loadCommentsPage },
)(ArticleView);
