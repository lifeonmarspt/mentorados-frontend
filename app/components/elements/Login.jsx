import React from "react";

import { postLogin } from "../../api/mentors";
import FormErrors from "../elements/FormErrors";

class Login extends React.Component {

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

  validateForm() {
    let errors = {};

    ["email", "password"].forEach((field) => {
      if (this.state.fields[field].length === 0) {
        errors[field] = "can't be empty";
      }
    });

    if (Object.keys(errors).length > 0) {
      this.setState({ errors: errors })
      return false;
    }


    return true;
  }

  onChange(field, event) {
      this.state.fields[field] = event.target.value;
      this.setState(this.state);
  }

  onSubmit(event) {
      event.preventDefault()
      this.setState({ errors: {} });

      if (!this.validateForm()) {
        return;
      }

      postLogin(this.state.fields)
        .then((result) => {
          this.props.doLogin(result.data);
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            console.log(error.response);
            this.setState({ errors: error.response.data })
          } else if (error.response) {
            this.setState({ errors: { "": error.response.statusText } })
          } else {
            this.setState({ errors: { "": error } })
          }
        });

  }

  render() {
    return (
      <form className="pure-form" onSubmit={this.onSubmit.bind(this)}>
        <h1 className="content-subhead">Login</h1>
        <fieldset>
        <FormErrors errors={this.state.errors} />
        </fieldset>
        <fieldset>
          <input onChange={this.onChange.bind(this, "email")} type="email" placeholder="Email" />
        </fieldset>
        <fieldset>
          <input onChange={this.onChange.bind(this, "password")} type="password" placeholder="Password" />
        </fieldset>
        <fieldset>
          <button type="submit" className="pure-button pure-button-primary">Sign in</button>
        </fieldset>
      </form>
    )
  }
}

export default Login;
