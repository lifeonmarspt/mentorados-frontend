import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import EditableCheckbox from "reactAdmin/components/formFields/EditableCheckbox";
import EditableCheckboxList from "reactAdmin/components/formFields/EditableCheckboxList";
import EditableRadio from "reactAdmin/components/formFields/EditableRadio";
import EditableTextArea from "reactAdmin/components/formFields/EditableTextArea";
import EditableText from "reactAdmin/components/formFields/EditableText";
import EditableArrayOf from "reactAdmin/components/formFields/EditableArrayOf";

import { defaultRoutes, defaultActions } from "reactAdmin/helpers";

import { api } from "lib/api";


const createMetaChoiceProvider = (field) => class extends React.Component {
  static contextTypes = {
    meta: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    choices: PropTypes.array.isRequired,
  };

  getChildContext() {
    return {
      choices: this.context.meta[field],
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export const name = "mentors";
export const routes = defaultRoutes(name, { prefix: "/admin" });
export const actions = defaultActions({ api, routes: defaultRoutes(name, { prefix: "/admin" }) });
export const listColumns = ["id", "name", "email"];

export const fields = [
  {
    id: "id",
    label: "#",
    displayAs: ({ resource }) => <Link to={routes.show(resource.id)}>{resource.id}</Link>,
  },
  {
    id: "user_id",
    label: "User #",
    displayAs: ({ resource }) => resource.user ? <Link to={`/admin/users/${resource.user.id}`}>{resource.user.id}</Link> : null,
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
    choicesProvider: createMetaChoiceProvider("genders"),
  },
  {
    id: "bio",
    label: "Bio",
    editableAs: EditableTextArea,
    displayAs: ({ resource }) => <div>{(resource.bio || "").split("\n").map((l, n) => <p key={n}>{l}</p>)}</div>,
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
    choicesProvider: createMetaChoiceProvider("careers"),
    displayAs: ({ resource, choices }) => <div>{(resource.career_ids || []).map((id) => <p key={id}>{choices.find((c) => c.id === id).description}</p>)}</div>,
  },
  {
    id: "links",
    label: "Links",
    displayAs: ({ resource }) => <div>{(resource.links || []).map((link, n) => <p key={n}><a href={link}>{link}</a></p>)}</div>,
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
