import "./styles";

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { translate } from "react-i18next";
import { connect } from "react-redux";

import { errorTransform } from "lib/errorTransform";
import FormError from "components/elements/FormError";

import { login } from "actions/session";

class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    fields: {
      email: "",
      password: "",
    },
    errors: {},
  }

  onChange(field, event) {
    this.state.fields[field] = event.target.value;
    this.setState(this.state);
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.setState({ errors: {} });

    const { email, password } = this.state.fields;
    const { t, login } = this.props;

    login(email, password)
    .catch(error => this.setState({ errors: errorTransform(error, { 404: t("error") })}));
  }

  render() {
    const { t } = this.props;

    return (
      <form className="Login pure-form" onSubmit={this.onSubmit}>
        <h1 className="content-subhead">
          {t("title")}
        </h1>
        <FormError error={this.state.errors.serverError} />

        <fieldset>
          <input
            onChange={this.onChange.bind(this, "email")}
            type="email"
            required
            placeholder={t("placeholder.email")}
          />
        </fieldset>

        <fieldset>
          <input
            onChange={this.onChange.bind(this, "password")}
            type="password"
            required
            placeholder={t("placeholder.password")}
          />
        </fieldset>

        <fieldset className="actions">
          <button type="submit" className="pure-button pure-button-primary">
            {t("submit")}
          </button>

          <Link to="/recover-password">
            {t("recover")}
          </Link>
        </fieldset>
      </form>
    );
  }
}

export default compose(
  translate([ "login" ]),

  connect(
    () => ({}),
    {
      login,
    },
  ),
)(Login);
