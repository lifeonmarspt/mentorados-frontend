import React from "react";

import { errorTransform } from "lib/errorTransform";
import { password_recovery_tokens } from "lib/api";

import FormError from "components/elements/FormError";
import FieldError from "components/elements/FieldError";

import t from "translations/pt.yml";


class RecoverPasswordForm extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { errors: {} };
  }

  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });

    password_recovery_tokens.create(
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
            className="recover__input"
            required
            placeholder={t.recover.placeholder.email}
          />
          <FieldError fieldName="email" errors={this.state.errors.email} />
        </fieldset>
        <fieldset>
          <button type="submit" className="pure-button pure-button-primary">
            {t.recover.submit}
          </button>
        </fieldset>
      </form>
    );
  }
};

export default RecoverPasswordForm;
