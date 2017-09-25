import { combineReducers } from "redux";

import currentUser from "./currentUser";
import jwt from "./jwt";
import mentors from "./mentors";
import meta from "./meta";
import toasts from "./toasts";

export default combineReducers({
  currentUser,
  jwt,
  mentors,
  meta,
  toasts,
});
