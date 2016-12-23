import { Schema, arrayOf } from 'normalizr';

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

// Schemas for Github API responses.
export const channelSchema = new Schema('channels', {
  idAttribute: 'fid',
});

export const forumSchema = new Schema('forums', {
  idAttribute: 'fid',
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
