import axios from "axios";
import { stringify } from "query-string";

import config from "../config";
import store from "store";

export const api = axios.create({
  baseURL: config.apiBaseURL,
});

api.interceptors.request.use(config => {
  const { jwt } = store.getState();

  if (jwt) config.headers["Authorization"] = `Bearer ${jwt}`;

  return config;
});

export const postConfirmation = (id, confirmation_token) => api.post(`/users/${id}/confirm`, { confirmation_token });

export const putPassword = (fields) => api.put("/users/password", fields);

export const meta = {
  index: () => api.get("/meta"),
};

export const session = {
  create: (fields) => api.post("/sessions", { session: fields }),
};

export const users = {
  create: (attributes) => api.post("/users", attributes),
  update: (id, attributes, token) => {
    const headers = token ? { "Authorization": `Bearer ${token}` } : {};
    return api.patch(`/users/${id}`, { user: attributes }, { headers });
  },
  me: () => api.get("/users/me"),
  confirm: (id, confirmation_token) => api.post(`/users/${id}/confirm`, { confirmation_token }),
};

export const mentors = {
  index: (filters = {}) => {
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
  },
};

export const password_recovery_tokens = {
  create: (attributes) => api.post("/password_recovery_tokens", { password_recovery_token: attributes }),
  get: (token) => api.get(`/password_recovery_tokens/${token}`),
};
