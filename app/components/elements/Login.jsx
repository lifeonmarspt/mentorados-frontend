import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { translate } from "react-i18next";

import { postLogin } from "lib/api";
import { errorTransform } from "lib/errorTransform";
import FormError from "components/elements/FormError";

class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    session: PropTypes.object
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

  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });

    postLogin(this.state.fields)
      .then((result) => {
        this.context.session.doLogin(result.data);
      })
      .catch((error) => {
        this.setState({ errors: errorTransform(error, { 404: "Invalid credentials" }) });
      });
  }

  render() {
    const { t } = this.props;

    return (
      <form className="login pure-form" onSubmit={this.onSubmit.bind(this)}>
        <h1 className="content-subhead">
          {t("title")}
        </h1>
        <FormError error={this.state.errors.serverError} />
        <fieldset>
          <input
            className="login__input"
            onChange={this.onChange.bind(this, "email")}
            type="email"
            required
            placeholder={t("placeholder.email")}
          />
        </fieldset>
        <fieldset>
          <input
            className="login__input"
            onChange={this.onChange.bind(this, "password")}
            type="password"
            required
            placeholder={t("placeholder.password")}
          />
        </fieldset>
        <fieldset>
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
)(Login);
