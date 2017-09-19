import React from "react";

import { errorTransform } from "lib/errorTransform";
import { users } from "lib/api";

import FormError from "components/elements/FormError";
import FieldError from "components/elements/FieldError";

class ResetPasswordForm extends React.Component {
  state = {
    errors: {},
  };

  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });

    users.update(this.props.user.id, { password: this.state.password }, this.props.token).then(
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
          <button type="submit" className="pure-button pure-button-primary">Change password</button>
        </fieldset>
      </form>
    );
  }
};

export default ResetPasswordForm;
