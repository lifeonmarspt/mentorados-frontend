import axios from "axios";
import { stringify } from "query-string";

import config from "../config";
import { cancelable } from "lib/tapete";

export const api = cancelable(axios.create({
  baseURL: config.apiBaseURL
}));

export const setAuthorization = (session) => {
  if (session && session.jwt) {
    api.defaults.headers.common["Authorization"] = `Bearer ${session.jwt}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const getCareers = () => api.get("/careers");

export const getMeta = () => api.get("/meta");

export const getMentors = (filters = {}) => {
  let url = "/mentors";

  let serializable = {
    string: filters.query ? filters.query : undefined,
    gender: filters.gender && filters.gender != "A" ? filters.gender : undefined,
    career_ids: filters.careers ? filters.careers : undefined,
  };

  let qs = stringify(serializable, { arrayFormat: "bracket" });
  if (qs) {
    url += `?${qs}`;
  }

  return api.get(url);
};

export const getUser = (id) => api.get(`/users/${id}`);

export const postLogin = (fields) => api.post("/login", { auth: fields });

export const postRegistration = (fields) => api.post("/users", fields);

export const postConfirmation = (id, confirmation_token) => api.post(`/users/${id}/confirm`, { confirmation_token });

export const postRecoverPassword = (fields) => api.post("/users/recover", fields);

export const getResetPasswordToken = (token) => api.get(`/users/reset-token/${token}`);

export const putPassword = (fields) => api.put("/users/password", fields);
