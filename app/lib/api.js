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
    career_ids: filters.careers ? filters.careers : undefined,
    trait_ids: filters.traits ? filters.traits : undefined,
  };

  let qs = stringify(serializable, { arrayFormat: "bracket" });
  if (qs) {
    url += `?${qs}`;
  }

  return api.get(url);
};

export const getUser = (id) => api.get(`/users/${id}`);

export const postLogin = (fields) => api.post("/sessions", { session: fields });

export const postConfirmation = (id, confirmation_token) => api.post(`/users/${id}/confirm`, { confirmation_token });

export const putPassword = (fields) => api.put("/users/password", fields);

export const users = {
  create: (attributes) => api.post("/users", attributes),
  update: (id, attributes, token) => {
    const headers = token ? { "Authorization": `Bearer ${token}` } : {};
    return api.patch(`/users/${id}`, { user: attributes }, { headers });
  },
  me: () => api.get("/users/me"),
};

export const password_recovery_tokens = {
  create: (attributes) => api.post("/password_recovery_tokens", { password_recovery_token: attributes }),
  get: (token) => api.get(`/password_recovery_tokens/${token}`),
};
