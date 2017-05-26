import React from "react";
import { Link } from "react-router-dom";

import EditableCheckbox from "reactAdmin/components/formFields/EditableCheckbox";
import EditableText from "reactAdmin/components/formFields/EditableText";
import { defaultRoutes, defaultActions } from "reactAdmin/helpers";

import { api } from "lib/api";


const name = "users";
const routes = defaultRoutes(name, { prefix: "/admin" });
const actions = defaultActions({ api, routes: defaultRoutes(name, { prefix: "/admin" }) });

const listColumns = ["id", "email"];
const showColumns = ["id", "email", "admin", "password"];
const editColumns = showColumns;

const fields = {
  id: {
    label: "#",
    displayAs: ({ resource }) => <Link to={routes.show(resource.id)}>{resource.id}</Link>,
  },
  email: {
    label: "Email",
    editableAs: EditableText,
  },
  admin: {
    label: "Admin?",
    displayAs: ({ resource }) => <span>{resource.admin ? "yes" : "no"}</span>,
    editableAs: EditableCheckbox,
  },
  password: {
    label: "Password",
    displayAs: ({ resource }) => <span>************</span>,
    editableAs: EditableText,
  },
};

export default {
  actions,
  routes,
  fields,
  name,
  listColumns,
  editColumns,
  showColumns,
};
