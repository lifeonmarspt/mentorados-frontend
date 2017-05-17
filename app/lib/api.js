import axios from "axios";
import { stringify } from "query-string";

import config from "../config";

const api = axios.create({
  baseURL: config.apiBaseURL
});

export const setAuthorization = (jwt) => {
  if (jwt) {
    api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const getCareers = () => {
  return api.get("/careers");
};

export const getMentors = (filters = {}) => {
  let url = "/mentors";

  let serializable = {
    string: filters.string ?
      filters.string : undefined,
    gender: filters.genders ?
      (filters.genders.find((gender) => gender.checked && gender.id !== "A") || {}).id : undefined,
    career_ids: filters.careers ?
      filters.careers.filter((career) => career.checked).map((career) => career.id) : undefined
  };

  let qs = stringify(serializable, { arrayFormat: "bracket" });
  if (qs) {
    url += `?${qs}`;
  }

  return api.get(url);
};

export const getMentor = (id) => {
  return api.get(`/mentors/${id}`);
};

export const postMentor = (data) => {
  return api.post(`/mentors`, data);
};

export const putMentor = (id, data) => {
  return api.put(`/mentors/${id}`, data);
};

export const deleteMentor = (id) => {
  return api.delete(`/mentors/${id}`);
};

export const getUsers = () => {
  return api.get("/users");
};

export const getUser = (id) => {
  return api.get(`/users/${id}`);
};

export const postLogin = (fields) => {
  return api.post("/login", {
    auth: fields
  });
};

export const postRegistration = (fields) => {
  return api.post("/users", fields);
};

export const postConfirmation = (id, confirmation_token) => {
  return api.post(`/users/${id}/confirm`, {
    confirmation_token: confirmation_token
  });
};
