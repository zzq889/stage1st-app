/* eslint-disable no-param-reassign */

import { Schema, arrayOf } from 'normalizr';

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

// function assignEntity(output, key, value) {
//   if (timeKeys.has(key)) {
//     output[key] = value;
//   } else {
//     output[key] = value;
//   }
// }

// Schemas
export const userSchema = new Schema('users', {
  idAttribute: 'uid',
});

export const channelSchema = new Schema('channels', {
  idAttribute: 'fid',
});

export const forumSchema = new Schema('forums', {
  idAttribute: 'fid',
});

export const threadSchema = new Schema('threads', {
  idAttribute: 'tid',
});

export const postSchema = new Schema('posts', {
  idAttribute: 'pid',
});

channelSchema.define({
  child: arrayOf(forumSchema),
});

const forumOrChannel = {
  channel: channelSchema,
  forum: forumSchema,
};

export const forumSchemaArray = arrayOf(forumOrChannel, {
  schemaAttribute: (entity) => {
    if (entity.child) {
      return 'channel';
    }
    return 'forum';
  },
});

export const threadSchemaArray = arrayOf(threadSchema);

export const postSchemaArray = arrayOf(postSchema);
