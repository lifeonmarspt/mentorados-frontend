import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";

import Section from "components/elements/Section";
import SignUpForm from "components/forms/SignUpForm";
import Login from "components/elements/Login";

class SignUp extends React.Component {
  constructor(...args) {
    super(...args);

    this.ref = {};
    this.state = {
      registered: false,
    };
  }

  onSubmit(event) {
    this.setState({ registered: true });
  }

  renderSignUpForm() {
    return (
      <SignUpForm onSuccess={this.onSubmit.bind(this)} />
    );
  }

  renderRegisteredMessage() {
    return (
      <Section>Registration sent! Check your email at <code>{this.state.fields.email}</code> for confirmation instructions!</Section>
    );
  }

  render() {
    let content = (!this.state.registered) ?
      <div>
        {this.renderSignUpForm()}
        <Login />
      </div> :
      this.renderRegisteredMessage();

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

export default compose(
  translate([ "signup" ]),
)(SignUp);
