import { fork } from 'redux-saga/effects';
import {
  watchLoadChannelPage,
  watchLoadForumPage,
} from '../modules/forum/ForumState';
import {
  watchLoadThreadPage,
  watchLoadMoreThreads,
  watchNewThread,
  watchNewThreadSuccess,
} from '../modules/thread/ThreadState';
import {
  watchLoadPostPage,
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
    fork(watchLoadThreadPage),
    fork(watchLoadMoreThreads),
    fork(watchNewThread),
    fork(watchNewThreadSuccess),
    fork(watchLoadPostPage),
    fork(watchUserAuth),
    fork(watchLoadUserPage),
    fork(watchUserSign),
  ];
}
