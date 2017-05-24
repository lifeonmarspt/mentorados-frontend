import React from "react";

import { errorTransform } from "lib/errorTransform";
import { postRegistration, putPassword } from "lib/api";

import Section from "components/elements/Section";
import FormError from "components/elements/FormError";
import FieldError from "components/elements/FieldError";


class ResetPasswordForm extends React.Component {
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

    putPassword({
      token: this.props.token,
      password: this.state.password,
    }).then(
      (result) => this.props.onSuccess(result.data),
    ).catch((error) => {
      this.setState({ errors: errorTransform(error, { 404: "login not found" }) });
    });
  }

  changeEventHandler(field) {
    return (event) => this.onChange(field, event);
  }

  render() {
    return (
      <form className="pure-form" onSubmit={this.onSubmit.bind(this)}>
        <p>Email: <strong>{this.props.user.email}</strong></p>
        <FormError error={this.state.errors.serverError} />
        <fieldset>
          <input
            onChange={this.changeEventHandler("password")}
            type="password"
            required
            placeholder="New password"
          />
          <FieldError fieldName="password" errors={this.state.errors.password} />
        </fieldset>
        <fieldset>
          <input
            ref={(input) => this.references.password_confirmation = input}
            onChange={this.changeEventHandler("password_confirmation")}
            type="password"
            required
            placeholder="Confirm new password"
          />
          <FieldError fieldName="password confirmation" errors={this.state.errors.password_confirmation} />
        </fieldset>
        <fieldset>
          <button type="submit" className="pure-button pure-button-primary">Change password</button>
        </fieldset>
      </form>
    );
  }
};

export default ResetPasswordForm;
