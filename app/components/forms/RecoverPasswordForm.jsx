import React from "react";

import { errorTransform } from "lib/errorTransform";
import { postRecoverPassword } from "lib/api";

import Section from "components/elements/Section";
import FormError from "components/elements/FormError";
import FieldError from "components/elements/FieldError";


class RecoverPasswordForm extends React.Component {
  constructor(...args) {
    super(...args);

    this.references = {};
    this.state = { errors: {} };
  }

  componentDidUpdate() {
    if (!this.references.password_confirmation) {
      return;
    }

    if (this.state.password != this.state.password_confirmation) {
      this.references.password_confirmation.setCustomValidity("Password confirmation does not match.");
    } else {
      this.references.password_confirmation.setCustomValidity("");
    }
  }

  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });

    postRecoverPassword(
      { email: this.state.email },
    ).then(
      (result) => this.props.onSuccess(this.state.email),
    ).catch((error) => {
      this.setState({ errors: errorTransform(error, { 404: "account not found" }) });
    });
  }

  changeEventHandler(field) {
    return (event) => this.onChange(field, event);
  }

  render() {
    return (
      <form className="pure-form" onSubmit={this.onSubmit.bind(this)}>
        <FormError error={this.state.errors.serverError} />
        <fieldset>
          <input
            onChange={this.changeEventHandler("email")}
            type="email"
            required
            placeholder="Email"
          />
          <FieldError fieldName="email" errors={this.state.errors.email} />
        </fieldset>
        <fieldset>
          <button type="submit" className="pure-button pure-button-primary">Recover password</button>
        </fieldset>
      </form>
    );
  }
};

export default RecoverPasswordForm;
