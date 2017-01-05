import { fork } from 'redux-saga/effects';
import {
  watchLoadChannelPage,
  watchLoadForumPage,
} from '../modules/forum/ForumState';
import {
  watchLoadThreadPage,
  watchLoadFavedThreadPage,
  watchLoadSubscribedThreadPage,
} from '../modules/thread/ThreadState';
import {
  watchLoadPostPage,
} from '../modules/post/PostState';
import {
  watchAuthUser,
} from '../modules/auth/AuthState';

export default function* root() {
  yield [
    fork(watchLoadChannelPage),
    fork(watchLoadForumPage),
    fork(watchLoadThreadPage),
    fork(watchLoadFavedThreadPage),
    fork(watchLoadSubscribedThreadPage),
    fork(watchLoadPostPage),
    fork(watchAuthUser),
  ];
}
