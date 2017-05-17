import React from "react";
import { Link } from "react-router-dom";

import { getMentor, putMentor, postMentor, deleteMentor } from "lib/api";
import EditableCheckbox from "components/elements/editable/EditableCheckbox";
import EditableRadio from "components/elements/editable/EditableRadio";
import EditableTextArea from "components/elements/editable/EditableTextArea";
import EditableText from "components/elements/editable/EditableText";

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

export const actions = {
  load: getMentor,
  save: putMentor,
  create: postMentor,
  destroy: deleteMentor
};

export const fields = [
  {
    id: "id",
    label: "#",
    displayAs: (r) => <Link to={`/admin/mentors/${r.id}`}>{r.id}</Link>
  },
  {
    id: "user_id",
    label: "User #",
    displayAs: (r) => r.user && <Link to={`/admin/users/${r.user.id}`}>{r.user.id}</Link>
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
    displayAs: (r) => r.bio.split("\n").map((l, n) => <p key={n}>{l}</p>),
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
    editableAs: EditableCheckbox,
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
  }
];
