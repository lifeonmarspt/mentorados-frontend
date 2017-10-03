import uuid from "uuid";
import { createAction } from "redux-actions";

import {
  ADD_TOAST,
  REMOVE_TOAST,
  CLEAR_TOASTS,
} from "action-types";

// constants
export const TOAST_LEVEL_SUCCESS = "success";
export const TOAST_LEVEL_ERROR = "error";
export const TOAST_DURATION_MS = 3000;

// actions
export const removeToast = createAction(REMOVE_TOAST);
export const clearToasts = createAction(CLEAR_TOASTS);

const addToast = params => {
  return dispatch => {
    const id = uuid.v4();

    window.setTimeout(() => dispatch(removeToast(id)), TOAST_DURATION_MS);

    return dispatch(createAction(ADD_TOAST)({
      id,
      content: "",
      level: TOAST_LEVEL_SUCCESS,
      ...params,
    }));
  };
};

export const addSuccessToast = (content) => addToast({ content, level: TOAST_LEVEL_SUCCESS });
export const addErrorToast = (content) => addToast({ content, level: TOAST_LEVEL_ERROR });
