import React from "react"
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { postRegistration } from "../../api/mentors";

import Section from "../elements/Section"
import FormErrors from "../elements/FormErrors"

class Home extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      sent: false,
      fields: {
        email: "",
        password: "",
        password_confirmation: ""
      },
      errors: {},
    };
  }

  onChange(field, event) {
      this.state.fields[field] = event.target.value;
      this.setState(this.state);
  }

  onSubmit(event) {
      event.preventDefault();
      this.setState({ errors: {} })

      postRegistration(this.state.fields)
        .then((result) => {
          this.setState({ sent: true });
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

  renderSignUpForm() {
    return (
      <div className="pure-g">
        <div className="pure-u-1-5">
          <form className="pure-form" onSubmit={this.onSubmit.bind(this)}>
            <h1 className="content-subhead">Registration</h1>
            <FormErrors errors={this.state.errors} />
            <fieldset>
              <input onChange={this.onChange.bind(this, "email")} type="email" placeholder="Email" />
            </fieldset>
            <fieldset>
              <input onChange={this.onChange.bind(this, "password")} type="password" placeholder="Password" />
            </fieldset>
            <fieldset>
              <input onChange={this.onChange.bind(this, "password_confirmation")} type="password" placeholder="Confirm Password" />
            </fieldset>
            <fieldset>
              <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }

  renderSentMessage() {
    return (
      <Section>Registration sent! Check your email at <code>{this.state.fields.email}</code> for confirmation instructions!</Section>
    );
  }

  render() {
    let content = (!this.state.sent) ? this.renderSignUpForm() : this.renderSentMessage();

    return (
      <div className="page-registration">
        <div className="posts">
          <Section title="Programa de Mentorados de Engenharia Informática - FEUP">
              <p>O registo é obrigatório e requer um endereço de email <code>fe.up.pt</code>. Ah, e há mais coisas que convém dizer, como por exemplo nao tomar banho depois de comer.</p>
          </Section>
          {content}
        </div>
      </div>
    );
  }

}

export default Home;
