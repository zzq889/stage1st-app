import { List } from 'immutable';
import { connect } from 'react-redux';
import NewsListView from './NewsListView';
import { loadNewsPage } from './NewsState';

export default connect(
  state => ({
    news: state
    .getIn(['entities', 'articles'], List())
    .sortBy(news => news.get('date'))
    .reverse()
    .toList(),
  }),
  { loadNewsPage },
)(NewsListView);
