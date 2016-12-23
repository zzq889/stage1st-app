import { createRouter } from '@exponent/ex-navigation';
import ColorViewContainer from './colors/ColorViewContainer';
import ForumTabViewContainer from './forum/ForumTabViewContainer';
import ThreadListViewContainer from './thread/ThreadListViewContainer';
import PostListViewContainer from './post/PostListViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
const AppRouter = createRouter(() => ({
  color: () => ColorViewContainer,
  threads: () => ThreadListViewContainer,
  forums: () => ForumTabViewContainer,
  posts: () => PostListViewContainer,
}));

export default AppRouter;
