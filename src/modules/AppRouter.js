import { createRouter } from '@exponent/ex-navigation';
import CounterViewContainer from './counter/CounterViewContainer';
import ColorViewContainer from './colors/ColorViewContainer';
import ForumListViewContainer from './forum/ForumListViewContainer';
import ThreadListViewContainer from './thread/ThreadListViewContainer';
import PostListViewContainer from './post/PostListViewContainer';

/**
 * AppRouter is responsible for mapping a navigator scene to a view
 */
const AppRouter = createRouter(() => ({
  counter: () => CounterViewContainer,
  color: () => ColorViewContainer,
  threads: () => ThreadListViewContainer,
  forums: () => ForumListViewContainer,
  posts: () => PostListViewContainer,
}));

export default AppRouter;
