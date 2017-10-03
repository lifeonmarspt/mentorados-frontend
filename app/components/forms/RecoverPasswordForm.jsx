import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";

import { errorTransform } from "lib/errorTransform";
import { password_recovery_tokens } from "lib/api";

import FormError from "components/elements/FormError";
import FieldError from "components/elements/FieldError";

class RecoverPasswordForm extends React.Component {
  state = {
    errors: {},
  }

  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ errors: {} });

    const { email } = this.state;

    password_recovery_tokens
    .create({ email })
    .then(() => this.props.onSuccess(email))
    .catch(error => this.setState({
      errors: errorTransform(error, { 404: this.props.t("error") }),
    }));
  }

  render() {
    const { t } = this.props;
    const { errors } = this.state;

    return (
      <form className="pure-form pure-form-narrow" onSubmit={this.onSubmit}>
        <FormError error={errors.serverError} />

        <fieldset>
          <input
            type="email"
            className="recover__input"
            onChange={ev => this.onChange("email", ev)}
            placeholder={t("form.email.placeholder")}
            required
          />
          <FieldError fieldName="email" errors={errors.email} />
        </fieldset>

        <fieldset>
          <button type="submit" className="pure-button pure-button-primary">
            {t("form.submit")}
          </button>
        </fieldset>
      </form>
    );
  }
};

export default compose(
  translate([ "recover_password" ]),
)(RecoverPasswordForm);
