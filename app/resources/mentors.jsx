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
import users from "resources/users";


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

const ChoiceList = (formatter) => ({ resource, field, choices }) => (
  <div>
    {choices.filter(
      (c) => resource[field].includes(c.id),
    ).map(
      (choice) => <p key={choice.id}>{formatter(choice)}</p>,
    )}
  </div>
);

const DisplayResourceLink = (metadata, label) => ({ resource, field }) => (
  resource[field] ? <Link to={metadata.routes.show(resource[field])}>{label}{resource[field]}</Link> : null
);


const name = "mentors";
const routes = defaultRoutes(name, { prefix: "/admin" });
const actions = defaultActions({ api, routes: defaultRoutes(name, { prefix: "/admin" }) });

const listColumns = ["id", "name", "email"];
const showColumns = ["id", "user_id", "active", "name", "email", "location", "gender", "bio", "year_in", "year_out", "career_ids", "links"];
const editColumns = showColumns;

const fields = {
  id: {
    label: "Mentor #",
    displayAs: DisplayResourceLink({ routes }, "Mentor #"),
  },
  user_id: {
    label: "User #",
    displayAs: DisplayResourceLink(users, "User #"),
  },
  active: {
    label: "Active",
    displayAs: ({ resource }) => <span>{resource.active ? "yes" : "no"}</span>,
    editableAs: EditableCheckbox,
  },
  name: {
    label: "Name",
    editableAs: EditableText,
  },
  email: {
    label: "Email",
    editableAs: EditableText,
  },
  location: {
    label: "Location",
    editableAs: EditableText,
  },
  gender: {
    label: "Gender",
    editableAs: EditableRadio,
    choicesProvider: createMetaChoiceProvider("genders"),
  },
  bio: {
    label: "Bio",
    editableAs: EditableTextArea,
    displayAs: ({ resource }) => <div>{(resource.bio || "").split("\n").map((l, n) => <p key={n}>{l}</p>)}</div>,
  },
  year_in: {
    label: "Enrolled In",
    editableAs: EditableText,
  },
  year_out: {
    label: "Graduated In",
    editableAs: EditableText,
  },
  career_ids: {
    label: "Careers",
    editableAs: EditableCheckboxList,
    choicesProvider: createMetaChoiceProvider("careers"),
    displayAs: ChoiceList((career) => career.description),
  },
  links: {
    label: "Links",
    displayAs: ({ resource }) => <div>{(resource.links || []).map((link, n) => <p key={n}><a href={link}>{link}</a></p>)}</div>,
    editableAs: EditableArrayOf(EditableText),
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
