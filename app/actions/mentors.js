import { createAction } from "redux-actions";

import {
  SET_MENTORS,
  CLEAR_MENTORS,
} from "action-types";

import { mentors } from "lib/api";

const setMentors = createAction(SET_MENTORS);

export const getMentors = (filters = {}) => {
  return dispatch => {
    return mentors
      .index(filters)
      .then(response => {
        dispatch(setMentors(response.data));
        return response.data;
      });
  };
};

export const clearMentors = createAction(CLEAR_MENTORS);
