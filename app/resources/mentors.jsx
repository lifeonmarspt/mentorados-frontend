/* eslint-disable new-cap */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";

import EditableCheckbox from "reactAdmin/components/formFields/EditableCheckbox";
import EditableCheckboxList from "reactAdmin/components/formFields/EditableCheckboxList";
import EditableTextArea from "reactAdmin/components/formFields/EditableTextArea";
import EditableText from "reactAdmin/components/formFields/EditableText";
import EditableArrayOf from "reactAdmin/components/formFields/EditableArrayOf";
import { defaultRoutes, defaultActions } from "reactAdmin/helpers";

import { api } from "lib/api";

const createMetaChoiceProvider = (field) => compose(
  connect(({ meta }) => ({ meta })),
)(class createMetaChoiceProvider extends React.Component {
  static childContextTypes = {
    choices: PropTypes.array.isRequired,
  };

  getChildContext() {
    return {
      choices: this.props.meta[field],
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
});

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

const newColumns = ["name", "email"];
const listColumns = ["name", "email"];
const showColumns = ["id", "active", "blocked", "name", "email", "password", "location", "bio", "year_in", "year_out", "career_ids", "trait_ids", "links"];
const editColumns = ["active", "blocked", "name", "email", "password", "location", "bio", "year_in", "year_out", "career_ids", "trait_ids", "links"];

const fields = {
  id: {
    label: "#",
    displayAs: DisplayResourceLink({ routes }),
  },
  active: {
    label: "Active",
    displayAs: ({ resource }) => <span>{resource.active ? "yes" : "no"}</span>,
    editableAs: EditableCheckbox,
  },
  blocked: {
    label: "Blocked",
    displayAs: ({ resource }) => <span>{resource.blocked ? "yes" : "no"}</span>,
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
  password: {
    label: "Password",
    displayAs: ({ resource }) => <span>************</span>,
    editableAs: EditableText,
  },
  location: {
    label: "Location",
    editableAs: EditableText,
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
    displayAs: ChoiceList(career => career.description),
  },
  trait_ids: {
    label: "Traits",
    editableAs: EditableCheckboxList,
    choicesProvider: createMetaChoiceProvider("traits"),
    displayAs: ChoiceList(trait => trait.description),
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
  newColumns,
  listColumns,
  editColumns,
  showColumns,
};

/* eslint-enable new-cap */
