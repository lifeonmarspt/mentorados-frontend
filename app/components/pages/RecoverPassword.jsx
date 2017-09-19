import React from "react";

import Section from "components/elements/Section";
import RecoverPasswordForm from "components/forms/RecoverPasswordForm";


const email = "mentoria@alumniei.pt";

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
      <div style={{margin: "4em auto", maxWidth: "30em"}}>
        <RecoverPasswordForm
          onSuccess={this.onSubmit.bind(this)}
        />
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
      <div className="posts">
        <section className="post">
          <header className="post-header">
            <h1 className="post-title">Programa de Mentorados de Engenharia Informática - FEUP</h1>
          </header>
          <p>
            O registo é obrigatório e requer um endereço de email {}
            <code>fe.up.pt</code>. Ah, e há mais coisas que convém dizer,
            como por exemplo nao tomar banho depois de comer.
          </p>
          {content}
        </section>

        <section>
          <h2>Contacto</h2>

          <p>
            Se quiserdes contactar as pessoas responsaveis pela manutencao da
            plataforma, com queixas, sugestoes, ou qualquer cena, mandai email
            para <a href={`mailto:${email}`}>{email}</a>.
          </p>
        </section>
      </div>
    );
  }
}

export default RecoverPassword;
