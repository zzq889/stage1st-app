import { fork } from 'redux-saga/effects';
import {
  watchLoadChannelPage,
  watchLoadForumPage,
} from '../modules/forum/ForumState';
import {
  watchLoadThreadInfo,
  watchLoadThreadPage,
  watchLoadMoreThreads,
  watchNewThread,
  watchFavThread,
  watchNewThreadSuccess,
} from '../modules/thread/ThreadState';
import {
  watchLoadPostPage,
  watchLoadPostHistoryPage,
  watchNewPost,
  watchNewPostSuccess,
} from '../modules/post/PostState';
import {
  watchUserAuth,
} from '../modules/auth/AuthState';
import {
  watchLoadUserPage,
  watchUserSign,
} from '../modules/user/UserState';

export default function* root() {
  yield [
    fork(watchLoadChannelPage),
    fork(watchLoadForumPage),
    fork(watchLoadThreadInfo),
    fork(watchLoadThreadPage),
    fork(watchLoadMoreThreads),
    fork(watchNewThread),
    fork(watchNewThreadSuccess),
    fork(watchFavThread),
    fork(watchLoadPostPage),
    fork(watchLoadPostHistoryPage),
    fork(watchNewPost),
    fork(watchNewPostSuccess),
    fork(watchUserAuth),
    fork(watchLoadUserPage),
    fork(watchUserSign),
  ];
}
