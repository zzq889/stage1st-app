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
  watchUserAuth,
} from '../modules/auth/AuthState';
import {
  watchLoadUserPage,
} from '../modules/user/UserState';

export default function* root() {
  yield [
    fork(watchLoadChannelPage),
    fork(watchLoadForumPage),
    fork(watchLoadThreadPage),
    fork(watchLoadFavedThreadPage),
    fork(watchLoadSubscribedThreadPage),
    fork(watchLoadPostPage),
    fork(watchUserAuth),
    fork(watchLoadUserPage),
  ];
}
