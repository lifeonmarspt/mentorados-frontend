import React from 'react'

import { postLogin } from '../../api/mentors'

class Login extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      fields: {
        email: '',
        password: ''
      }
    };
  }

  onChange(field, event) {
      this.state.fields[field] = event.target.value;
      this.setState(this.state);
  }

  onSubmit(event) {
      event.preventDefault();

      postLogin(this.state.fields)
        .then((result) => {
          this.props.doLogin(result.data);
        });

  }

  render() {
    return (
      <form className="pure-form" onSubmit={this.onSubmit.bind(this)}>
        <h1 className="content-subhead">Login</h1>
        <fieldset>
          <input onChange={this.onChange.bind(this, 'email')} type="email" placeholder="Email" />
        </fieldset>
        <fieldset>
          <input onChange={this.onChange.bind(this, 'password')} type="password" placeholder="Password" />
        </fieldset>
        <fieldset>
          <button type="submit" className="pure-button pure-button-primary">Sign in</button>
        </fieldset>
      </form>
    )
  }
}

export default Login;
