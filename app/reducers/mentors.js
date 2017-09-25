import {
  SET_MENTORS,
  CLEAR_MENTORS,
} from "action-types";

export default function mentors(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MENTORS:
      return payload;

    case CLEAR_MENTORS:
      return [];

    default:
      return state;
  }
}
