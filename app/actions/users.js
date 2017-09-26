import {
  setJWT,
  getCurrentUser,
} from "actions/session";

import { users } from "lib/api";

export const confirmAccount = (id, token) => {
  return dispatch => {
    return users
      .confirm(id, token)
      .then(response => {
        dispatch(setJWT(response.jwt));
        dispatch(getCurrentUser());
      });
  };
};
