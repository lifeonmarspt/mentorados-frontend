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
    label: "#",
    displayAs: ({ resource }) => <Link to={routes.show(resource.id)}>{resource.id}</Link>,
  },
  {
    id: "email",
    label: "Email",
    editableAs: EditableText,
  },
  {
    id: "admin",
    label: "Admin?",
    displayAs: ({ resource }) => <span>{resource.admin ? "yes" : "no"}</span>,
    editableAs: EditableCheckbox,
  },
  {
    id: "password",
    label: "Password",
    displayAs: ({ resource }) => <span>************</span>,
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
