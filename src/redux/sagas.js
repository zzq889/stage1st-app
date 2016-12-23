import { fork } from 'redux-saga/effects';
import {
  watchLoadChannelPage,
  watchLoadForumPage,
} from '../modules/forum/ForumState';
import {
  watchLoadThreadPage,
} from '../modules/thread/ThreadState';
import {
  watchLoadPostPage,
} from '../modules/post/PostState';

export default function* root() {
  yield [
    fork(watchLoadChannelPage),
    fork(watchLoadForumPage),
    fork(watchLoadThreadPage),
    fork(watchLoadPostPage),
  ];
}
