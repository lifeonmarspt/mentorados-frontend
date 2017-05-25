import React from "react";
import { Link } from "react-router-dom";

import EditableCheckbox from "reactAdmin/components/formFields/EditableCheckbox";
import EditableText from "reactAdmin/components/formFields/EditableText";
import { defaultRoutes, defaultActions } from "reactAdmin/helpers";

import { api } from "lib/api";


export const name = "users";
export const routes = defaultRoutes(name, { prefix: "/admin" });
export const actions = defaultActions({ api, routes: defaultRoutes(name, { prefix: "/admin" }) });
export const listColumns = ["id", "email"];

export const fields = [
  {
    id: "id",
    label: "User #",
    displayAs: (r) => <Link to={routes.show(r.id)}>{r.id}</Link>,
  },
  {
    id: "email",
    label: "Email",
    editableAs: EditableText,
  },
  {
    id: "admin",
    label: "Admin?",
    displayAs: (r) => r.admin ? "yes" : "no",
    editableAs: EditableCheckbox,
  },
  {
    id: "password",
    label: "Password",
    displayAs: (r) => "************",
    editableAs: EditableText,
  },
];

export default {
  actions,
  routes,
  fields,
  name,
  listColumns,
};
