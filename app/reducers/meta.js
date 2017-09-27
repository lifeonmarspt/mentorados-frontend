import {
  SET_META,
  CLEAR_META,
} from "action-types";

export default function meta(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_META:
      return payload;

    case CLEAR_META:
      return {};

    default:
      return state;
  }
}
