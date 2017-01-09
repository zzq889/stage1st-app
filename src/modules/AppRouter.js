import { createRouter } from '@exponent/ex-navigation';
import TabScreen from './navigation/TabScreen';
import LoginViewContainer from './auth/LoginViewContainer';
import ColorViewContainer from './colors/ColorViewContainer';
import ForumTabViewContainer from './forum/ForumTabViewContainer';
import ThreadListViewContainer from './thread/ThreadListViewContainer';
import SubscribedTabViewContainer from './thread/SubscribedTabViewContainer';
import ThreadComposeView from './thread/ThreadComposeView';
import PostListViewContainer from './post/PostListViewContainer';
import ProfileViewContainer from './user/ProfileViewContainer';
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
  newThread: () => ThreadComposeView,
  forums: () => ForumTabViewContainer,
  posts: () => PostListViewContainer,
  profile: () => ProfileViewContainer,
  about: () => AboutView,
}));

export default AppRouter;
