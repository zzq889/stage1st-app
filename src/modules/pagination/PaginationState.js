import { combineReducers } from 'redux-immutable';
import paginate from './paginate';
import {
  forumRequestTypes,
} from '../forum/ForumState';

// Updates the pagination data for different actions.
export default combineReducers({
  forumsByFid: paginate({
    mapActionToKey: action => action.fid,
    types: [
      forumRequestTypes.REQUEST,
      forumRequestTypes.SUCCESS,
      forumRequestTypes.FAILURE,
    ],
  }),
});
