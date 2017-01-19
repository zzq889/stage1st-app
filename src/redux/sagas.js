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
    fork(watchNewPost),
    fork(watchNewPostSuccess),
    fork(watchLoadPostPage),
    fork(watchUserAuth),
    fork(watchLoadUserPage),
    fork(watchUserSign),
  ];
}
