import React from "react"
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { errorTransform } from "../../lib/errorTransform";
import { postRegistration } from "../../lib/api";

import Section from "../elements/Section";
import FormError from "../elements/FormError";
import FieldError from "../elements/FieldError";

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
          this.setState({ errors: errorTransform(error, { 404: 'login not found' }) });
        });
  }

  renderSignUpForm() {
    return (
      <div className="pure-g">
        <div className="pure-u-1-5">
          <form className="pure-form" onSubmit={this.onSubmit.bind(this)}>
            <h1 className="content-subhead">Registration</h1>
            <FormError error={this.state.errors.serverError} />
            <fieldset>
              <input onChange={this.onChange.bind(this, "email")} type="email" required placeholder="Email" />
              <FieldError fieldName="email" errors={this.state.errors.email} />
            </fieldset>
            <fieldset>
              <input onChange={this.onChange.bind(this, "password")} type="password" required placeholder="Password" />
              <FieldError fieldName="password" errors={this.state.errors.password} />
            </fieldset>
            <fieldset>
              <input onChange={this.onChange.bind(this, "password_confirmation")} type="password" required placeholder="Confirm Password" />
              <FieldError fieldName="password confirmation" errors={this.state.errors.password_confirmation} />
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
