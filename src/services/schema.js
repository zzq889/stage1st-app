/* eslint-disable no-param-reassign */

import { schema } from 'normalizr';

function replaceHtmlEntites(text) {
  const translateRe = /&(nbsp|amp|quot|lt|gt);/g;
  const translate = {
    nbsp: ' ',
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>',
  };
  return text.replace(translateRe, (match, entity) => translate[entity]);
}

// Schemas
export const userSchema = new schema.Entity('users', {}, {
  idAttribute: 'uid',
});

export const channelSchema = new schema.Entity('channels', {}, {
  idAttribute: 'fid',
});

export const forumSchema = new schema.Entity('forums', {}, {
  idAttribute: 'fid',
});

export const typeSchema = new schema.Entity('types', {}, {
  idAttribute: 'typeid',
});

export const threadSchema = new schema.Entity('threads', {}, {
  idAttribute: 'tid',
  processStrategy: (entity) => {
    entity.subject = replaceHtmlEntites(entity.subject);
    return entity;
  },
});
export const threadSchemaArray = [threadSchema];

export const postSchema = new schema.Entity('posts', {}, {
  idAttribute: 'pid',
});
export const postSchemaArray = [postSchema];

export const notificationSchema = new schema.Entity('notifications');
export const notificationSchemaArray = [notificationSchema];

export const articleSchema = new schema.Entity('articles');
export const articleSchemaArray = [articleSchema];
export const commentSchema = new schema.Entity('comments');
export const commentSchemaArray = [commentSchema];

channelSchema.define({
  child: [forumSchema],
});

forumSchema.define({
  types: [typeSchema],
});

export const forumSchemaArray = new schema.Array({
  channel: channelSchema,
  forum: forumSchema,
}, input => (input.child.length > 0 ? 'channel' : 'forum'));
