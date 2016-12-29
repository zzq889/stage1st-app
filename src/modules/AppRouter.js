import { createRouter } from '@exponent/ex-navigation';
import TabScreen from './navigation/TabScreen';
import LoginContainer from './auth/LoginContainer';
import ColorViewContainer from './colors/ColorViewContainer';
import ForumTabViewContainer from './forum/ForumTabViewContainer';
import ThreadListViewContainer from './thread/ThreadListViewContainer';
import FavedThreadListViewContainer from './thread/FavedThreadListViewContainer';
import SubscribedThreadListViewContainer from './thread/SubscribedThreadListViewContainer';
import PostListViewContainer from './post/PostListViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
const AppRouter = createRouter(() => ({
  app: () => TabScreen,
  login: () => LoginContainer,
  color: () => ColorViewContainer,
  threads: () => ThreadListViewContainer,
  favedThreads: () => FavedThreadListViewContainer,
  subscribedThreads: () => SubscribedThreadListViewContainer,
  forums: () => ForumTabViewContainer,
  posts: () => PostListViewContainer,
}));

export default AppRouter;
