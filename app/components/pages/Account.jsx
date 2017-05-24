import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Table from "reactAdmin/components/Table";
import { ShowComponent, EditComponent } from 'reactAdmin/helpers'

import { getMentors } from "lib/api";
import Mentor from "components/elements/Mentor";
import Section from "components/elements/Section";

import mentorDescription from "resources/mentors";
import userDescription from "resources/users";


class Account extends React.Component {
  static contextTypes = {
    session: PropTypes.object
  }

  constructor(...args) {
    super(...args);

    this.state = {
      errors: {},
    };
  }

  onInputChange(fieldMetadata, value) {
    this.setState({
      resource: {
        ...this.state.resource,
        [fieldMetadata.id]: value,
      },
      changes: {
        ...this.state.changes,
        [fieldMetadata.id]: value,
      },
    });
  }

  render() {
    const userRows = userDescription.fields.map((field) => ({
      label: field.label,
      field: <EditComponent
        fieldMetadata={field}
        resource={this.context.session.user}
        onChange={this.onInputChange.bind(this, field)}
        errors={this.state.errors[field.id]}
      />,
    }));

    const mentorRows = mentorDescription.fields.map((field) => ({
      label: field.label,
      field: <EditComponent
        fieldMetadata={field}
        resource={this.context.session.user}
        onChange={this.onInputChange.bind(this, field)}
        errors={this.state.errors[field.id]}
      />,
    }));

    return (
      <div>
        <h1>Account information</h1>
        <form className="pure-form" onSubmit={null}>
          <Table data={userRows}>
            <button type="submit" className="pure-button pure-button-primary">Save</button>
          </Table>
        </form>

        <h1>Mentor information</h1>
        <form className="pure-form" onSubmit={null}>
          <Table data={mentorRows}>
            <button type="submit" className="pure-button pure-button-primary">Save</button>
          </Table>
        </form>
      </div>
    );
  }
}

export default Account;
