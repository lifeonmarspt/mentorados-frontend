import React from "react";
import { Link } from "react-router-dom";

import { getMentors, getMentor, putMentor, postMentor, deleteMentor } from "lib/api";
import EditableCheckbox from "reactAdmin/components/formFields/EditableCheckbox";
import EditableCheckboxList from "reactAdmin/components/formFields/EditableCheckboxList";
import EditableRadio from "reactAdmin/components/formFields/EditableRadio";
import EditableTextArea from "reactAdmin/components/formFields/EditableTextArea";
import EditableText from "reactAdmin/components/formFields/EditableText";
import { defaultRoutes } from "reactAdmin/helpers";

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

export const resourceName = "mentors";

export const actions = {
  list: getMentors,
  load: getMentor,
  update: putMentor,
  create: postMentor,
  destroy: deleteMentor
};

export const routes = defaultRoutes(resourceName);

export const fields = [
  {
    id: "id",
    label: "#",
    displayAs: (r) => <Link to={routes.show(r.id)}>{r.id}</Link>
  },
  {
    id: "user_id",
    label: "User #",
    displayAs: (r) => r.user ? <Link to={`/admin/users/${r.user.id}`}>{r.user.id}</Link> : null
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
    id: "careers",
    label: "Careers",
    editableAs: EditableCheckboxList,
    editableChoices: temp_careers,
    displayAs: (r) => (r.careers || []).map((c, n) => <p key={n}>{c.description}</p>),
  },
  {
    id: "locations",
    label: "Locations",
    displayAs: (r) => (r.locations || []).map((l, n) => <p key={n}>{l.description}</p>),
  },
  {
    id: "created_at",
    label: "Created At",
  },
  {
    id: "updated_at",
    label: "Updated At",
  },
];

export default {
  actions,
  routes,
  fields,
};
