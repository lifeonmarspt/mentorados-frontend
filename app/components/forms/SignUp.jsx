import React from "react";

import { errorTransform } from "lib/errorTransform";
import { users } from "lib/api";

import Section from "components/elements/Section";
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
    return (
      <form className="signup pure-form" onSubmit={this.onSubmit.bind(this)}>
        <h1 className="content-subhead">Registo</h1>
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
          <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
        </fieldset>
      </form>
    );
  }
};

export default SignUp;
