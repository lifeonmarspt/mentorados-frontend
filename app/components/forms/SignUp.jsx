import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";

import { errorTransform } from "lib/errorTransform";
import { users } from "lib/api";

import FormError from "components/elements/FormError";
import FieldError from "components/elements/FieldError";

class SignUp extends React.Component {
  state = {
    errors: {},
  };

  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });

    users.create({ email: this.state.email }).then(
      (result) => this.props.onSuccess(result.data),
    ).catch(
      (error) => this.setState({ errors: errorTransform(error) }),
    );
  }

  changeEventHandler(field) {
    return (event) => this.onChange(field, event);
  }

  render() {
    const { t } = this.props;

    return (
      <form className="signup pure-form" onSubmit={this.onSubmit.bind(this)}>
        <h1 className="content-subhead">{t("title")}</h1>
        <FormError error={this.state.errors.serverError} />
        <fieldset>
          <input
            className="signup__input"
            onChange={this.changeEventHandler("email")}
            type="email"
            required
            placeholder="email@fe.up.pt"
          />
          <FieldError fieldName="email" errors={this.state.errors.email} />
        </fieldset>
        <fieldset>
          <button type="submit" className="pure-button pure-button-primary">{t("submit")}</button>
        </fieldset>
      </form>
    );
  }
};

export default compose(
  translate([ "signup" ]),
)(SignUp);
