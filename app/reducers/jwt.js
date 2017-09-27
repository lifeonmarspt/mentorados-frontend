import {
  SET_JWT,
  CLEAR_JWT,
} from "action-types";

export default function jwt(state = null, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_JWT:
      return payload;

    case CLEAR_JWT:
      return null;

    default:
      return state;
  }
}
