import React from "react";
import { Link } from "react-router-dom";

import { getUsers, getUser } from "lib/api";
import EditableCheckbox from "reactAdmin/components/formFields/EditableCheckbox";
import EditableRadio from "reactAdmin/components/formFields/EditableRadio";
import EditableTextArea from "reactAdmin/components/formFields/EditableTextArea";
import EditableText from "reactAdmin/components/formFields/EditableText";


export const resourceName = "users";

export const actions = {
  list: getUsers,
  load: getUser,
};

export const routes = {
  show: (id) => `/admin/${resourceName}/${id}`,
  edit: (id) => `/admin/${resourceName}/${id}/edit`,
  new: () => `/admin/${resourceName}/new`,
  list: () => `/admin/${resourceName}`,
};

export const fields = [
  {
    id: "id",
    label: "#",
    displayAs: (r) => (<Link to={routes.show(r.id)}>{r.id}</Link>),
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
    editableAs: EditableCheckbox, // TODO
  },
  {
    id: "mentor_id",
    label: "Mentor #",
    displayAs: (r) => r.mentor ? <Link to={`/admin/mentors/${r.mentor.id}`}>{r.mentor.id}</Link> : null,
  },
  {
    id: "created_at",
    label: "Created at",
  },
  {
    id: "updated_at",
    label: "Updated at",
  }
];

export default {
  actions,
  routes,
  fields,
};

