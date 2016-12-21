import { fork } from 'redux-saga/effects';
import { watchLoadForumPage } from '../modules/forum/ForumState';

export default function* root() {
  yield [
    fork(watchLoadForumPage),
  ];
}
