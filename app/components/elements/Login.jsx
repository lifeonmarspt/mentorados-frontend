import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { postLogin } from "lib/api";
import { errorTransform } from "lib/errorTransform";
import FormError from "components/elements/FormError";

class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    session: PropTypes.object
  }

  constructor(...args) {
    super(...args);

    this.state = {
      fields: {
        email: "",
        password: ""
      },
      errors: {}
    };
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
        throw error;
      });
  }

  render() {
    return (
      <form className="pure-form" onSubmit={this.onSubmit.bind(this)}>
        <h1 className="content-subhead">Login</h1>
        <FormError error={this.state.errors.serverError} />
        <fieldset>
          <input onChange={this.onChange.bind(this, "email")} type="email" required placeholder="Email" />
        </fieldset>
        <fieldset>
          <input onChange={this.onChange.bind(this, "password")} type="password" required placeholder="Password" />
        </fieldset>
        <fieldset>
          <Link to="/recover-password">Forgot password?</Link>
          <button type="submit" className="pure-button pure-button-primary">Sign in</button>
        </fieldset>
      </form>
    );
  }
}

export default Login;
