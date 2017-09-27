import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
} from "action-types";

export default function currentUser(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_USER:
      return payload;

    case CLEAR_CURRENT_USER:
      return {};

    default:
      return state;
  }
}
