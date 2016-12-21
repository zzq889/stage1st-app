import { combineReducers } from 'redux-loop';
import paginate from './paginate';
import { FORUM } from '../forum/ForumState';

// Updates the pagination data for different actions.
export default combineReducers({
  forumsByFid: paginate({
    mapActionToKey: action => action.fid,
    types: [
      FORUM.REQUEST,
      FORUM.SUCCESS,
      FORUM.FAILURE,
    ],
  }),
});
