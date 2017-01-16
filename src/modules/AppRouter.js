import { createRouter } from '@exponent/ex-navigation';
import TabScreen from './navigation/TabScreen';
import LoginViewContainer from './auth/LoginViewContainer';
import ColorViewContainer from './colors/ColorViewContainer';
import ForumTabViewContainer from './forum/ForumTabViewContainer';
import ThreadListViewContainer from './thread/ThreadListViewContainer';
import SubscribedTabViewContainer from './thread/SubscribedTabViewContainer';
import ThreadComposeViewContainer from './thread/ThreadComposeViewContainer';
import PostListViewContainer from './post/PostListViewContainer';
import ProfileViewContainer from './user/ProfileViewContainer';
import HistoryTabView from './user/HistoryTabView';
import AboutView from './about/AboutView';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
const AppRouter = createRouter(() => ({
  app: () => TabScreen,
  login: () => LoginViewContainer,
  color: () => ColorViewContainer,
  threads: () => ThreadListViewContainer,
  subscribed: () => SubscribedTabViewContainer,
  newThread: () => ThreadComposeViewContainer,
  forums: () => ForumTabViewContainer,
  posts: () => PostListViewContainer,
  profile: () => ProfileViewContainer,
  history: () => HistoryTabView,
  about: () => AboutView,
}));

export default AppRouter;
