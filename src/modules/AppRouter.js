import { createRouter } from '@exponent/ex-navigation';
import ColorViewContainer from './colors/ColorViewContainer';
import ForumListViewContainer from './forum/ForumListViewContainer';
import ThreadListViewContainer from './thread/ThreadListViewContainer';
import PostListViewContainer from './post/PostListViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
const AppRouter = createRouter(() => ({
  color: () => ColorViewContainer,
  threads: () => ThreadListViewContainer,
  forums: () => ForumListViewContainer,
  posts: () => PostListViewContainer,
}));

export default AppRouter;
