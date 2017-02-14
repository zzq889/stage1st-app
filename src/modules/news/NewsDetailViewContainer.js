import { connect } from 'react-redux';
import NewsDetailView from './NewsDetailView';

export default connect((state, { navigation }) => ({
  id: navigation.state.params.id,
  url: navigation.state.params.url,
}))(NewsDetailView);
