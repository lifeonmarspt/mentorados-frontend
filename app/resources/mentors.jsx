import React from "react";
import { Link } from "react-router-dom";

import EditableCheckbox from "reactAdmin/components/formFields/EditableCheckbox";
import EditableCheckboxList from "reactAdmin/components/formFields/EditableCheckboxList";
import EditableRadio from "reactAdmin/components/formFields/EditableRadio";
import EditableTextArea from "reactAdmin/components/formFields/EditableTextArea";
import EditableText from "reactAdmin/components/formFields/EditableText";
import EditableArrayOf from "reactAdmin/components/formFields/EditableArrayOf";

import { defaultRoutes, defaultActions } from "reactAdmin/helpers";

import { api } from "lib/api";


const temp_careers = [
  {
    "id": 1,
    "description": "Entrepreneurship"
  },
  {
    "id": 2,
    "description": "Freelance"
  },
  {
    "id": 3,
    "description": "Academia"
  },
  {
    "id": 4,
    "description": "Management"
  },
  {
    "id": 5,
    "description": "Startup/Scaleup"
  },
  {
    "id": 6,
    "description": "Established Company"
  }
];

export const name = "mentors";
export const routes = defaultRoutes(name, { prefix: "/admin" });
export const actions = defaultActions({ api, routes: defaultRoutes(name, { prefix: "/admin" }) });
export const listColumns = ["id", "name", "email"];

export const fields = [
  {
    id: "id",
    label: "#",
    displayAs: (r) => <Link to={routes.show(r.id)}>{r.id}</Link>,
  },
  {
    id: "user_id",
    label: "User #",
    displayAs: (r) => r.user ? <Link to={`/admin/users/${r.user.id}`}>{r.user.id}</Link> : null,
  },
  {
    id: "name",
    label: "Name",
    editableAs: EditableText,
  },
  {
    id: "email",
    label: "Email",
    editableAs: EditableText,
  },
  {
    id: "location",
    label: "Location",
    editableAs: EditableText,
  },
  {
    id: "gender",
    label: "Gender",
    editableAs: EditableRadio,
    editableChoices: [
      { id: "F", description: "Female" },
      { id: "M", description: "Male" },
    ],
  },
  {
    id: "bio",
    label: "Bio",
    editableAs: EditableTextArea,
    displayAs: (r) => (r.bio || "").split("\n").map((l, n) => <p key={n}>{l}</p>),
  },
  {
    id: "year_in",
    label: "Enrolled In",
    editableAs: EditableText,
  },
  {
    id: "year_out",
    label: "Graduated In",
    editableAs: EditableText,
  },
  {
    id: "career_ids",
    label: "Careers",
    editableAs: EditableCheckboxList,
    editableChoices: temp_careers,
    displayAs: (r) => (r.career_ids || []).map((id) => <p key={id}>{temp_careers.find((c) => c.id === id).description}</p>),
  },
  {
    id: "links",
    label: "Links",
    displayAs: (r) => (r.links || []).map((link, n) => <p key={n}><a href={link}>{link}</a></p>),
    editableAs: EditableArrayOf(EditableText),
  },
];

export default {
  actions,
  routes,
  fields,
  name,
  listColumns,
};
