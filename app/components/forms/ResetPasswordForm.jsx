import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";
import { connect } from "react-redux";

import { errorTransform } from "lib/errorTransform";

import FormError from "components/elements/FormError";
import FieldError from "components/elements/FieldError";

import { resetPassword } from "actions/session";

class ResetPasswordForm extends React.Component {
  state = {
    errors: {},
  };

  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ errors: {} });

    const { t, user, token, resetPassword } = this.props;
    const { password } = this.state;

    resetPassword(user.id, password, token)
    .then(response => this.props.onSuccess(response.data))
    .catch(error => this.setState({
      errors: errorTransform(error, { 404: t("form.error") }),
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
            onChange={ev => this.onChange("password", ev)}
            type="password"
            required
            placeholder={t("form.password.placeholder")}
          />
          <FieldError fieldName="password" errors={errors.password} />
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
  translate([ "reset_password" ]),

  connect(
    () => ({}),
    {
      resetPassword,
    },
  ),
)(ResetPasswordForm);
