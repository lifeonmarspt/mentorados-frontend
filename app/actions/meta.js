import { createAction } from "redux-actions";

import {
  SET_META,
  CLEAR_META,
} from "action-types";

import { meta } from "lib/api";

const setMeta = createAction(SET_META);

export const getMeta = () => {
  return dispatch => {
    return meta
    .index()
    .then(response => {
      dispatch(setMeta(response.data));
      return response.data;
    });
  };
};

export const clearMeta = createAction(CLEAR_META);
