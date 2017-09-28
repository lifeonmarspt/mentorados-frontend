import { createAction } from "redux-actions";

import {
  SET_JWT,
  CLEAR_JWT,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
} from "action-types";

import { session, users } from "lib/api";

export const setJWT = createAction(SET_JWT);
const clearJWT = createAction(CLEAR_JWT);
const setCurrentUser = createAction(SET_CURRENT_USER);
const clearCurrentUser = createAction(CLEAR_CURRENT_USER);

export const getCurrentUser = () => {
  return dispatch => {
    return users
      .me()
      .then(response => {
        dispatch(setCurrentUser(response.data));
        return response.data;
      });
  };
};

export const updateCurrentUser = (params) => {
  return (dispatch, getState) => {
    return users
      .update(getState().currentUser.id, params)
      .then(response => {
        dispatch(setCurrentUser(response.data));
        return response.data;
      });
  };
};

export const login = (email, password) => {
  return dispatch => {
    return session
      .create({ email, password })
      .then(response => {
        dispatch(setJWT(response.data.jwt));
        dispatch(getCurrentUser());
        return response.data.jwt;
      });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(clearJWT());
    dispatch(clearCurrentUser());
  };
};
