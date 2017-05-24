import React from "react";

import { errorTransform } from "lib/errorTransform";
import { postRecoverPassword } from "lib/api";

import Section from "components/elements/Section";
import RecoverPasswordForm from "components/forms/RecoverPasswordForm";


class RecoverPassword extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      sent: false,
      email: "",
      errors: {},
    };
  }

  onChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  onSubmit() {
    this.setState({ sent: true });
  }

  renderForm() {
    return (
      <div className="pure-g">
        <div className="pure-u-1-2">
          <RecoverPasswordForm
            onSuccess={this.onSubmit.bind(this)}
          />
        </div>
      </div>
    );
  }

  renderSentMessage() {
    return (
      <Section>
        <p>
          We've sent an email to <code>{this.state.email}</code>. Click
          the link in the email to reset your password.
        </p>

        <p>
          If you don't see the email, check other places it might be, like your
          junk, spam, social, or other folders.
        </p>
      </Section>
    );
  }

  render() {
    let content = !this.state.sent ? this.renderForm() : this.renderSentMessage();

    return (
      <div className="page-registration">
        <div className="posts">
          <Section title="Programa de Mentorados de Engenharia Informática - FEUP">
            <p>
              O registo é obrigatório e requer um endereço de email {}
              <code>fe.up.pt</code>. Ah, e há mais coisas que convém dizer,
              como por exemplo nao tomar banho depois de comer.
            </p>
          </Section>
          {content}
        </div>
      </div>
    );
  }
}

export default RecoverPassword;
