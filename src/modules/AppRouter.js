import { createRouter } from '@exponent/ex-navigation';
import TabScreen from './navigation/TabScreen';
import LoginViewContainer from './auth/LoginViewContainer';
import ColorViewContainer from './colors/ColorViewContainer';
import ForumTabViewContainer from './forum/ForumTabViewContainer';
import ThreadListViewContainer from './thread/ThreadListViewContainer';
import ThreadComposeView from './thread/ThreadComposeView';
import FavedThreadListViewContainer from './thread/FavedThreadListViewContainer';
import SubscribedThreadListViewContainer from './thread/SubscribedThreadListViewContainer';
import PostListViewContainer from './post/PostListViewContainer';
import ProfileViewContainer from './user/ProfileViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
const AppRouter = createRouter(() => ({
  app: () => TabScreen,
  login: () => LoginViewContainer,
  color: () => ColorViewContainer,
  threads: () => ThreadListViewContainer,
  favedThreads: () => FavedThreadListViewContainer,
  subscribedThreads: () => SubscribedThreadListViewContainer,
  newThread: () => ThreadComposeView,
  forums: () => ForumTabViewContainer,
  posts: () => PostListViewContainer,
  profile: () => ProfileViewContainer,
}));

export default AppRouter;
