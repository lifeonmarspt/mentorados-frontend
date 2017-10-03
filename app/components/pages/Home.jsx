import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";

import SignUp from "components/forms/SignUp";
import Login from "components/elements/Login";

import { contactEmail } from "globals";

class Home extends React.Component {
  state = {
    registered: false,
  };

  onSubmit = (event) => {
    this.setState({ registered: event.email });
  }

  renderRegisteredMessage() {
    return (
      <div>
        Registration sent! Check your email at
        <code>{this.state.registered}</code> for confirmation instructions!
      </div>
    );
  }

  render() {
    const { t } = this.props;

    return (
      <div className="posts">
        <section className="post">
          <h1 className="post-title">{t("title")}</h1>
          <p>
            Introducao à plataforma e aos seus objectivos.
          </p>

          <h2>Codigo de conduta</h2>
          <p>
            Short version: This code of conduct applies to all Make or Break
            spaces, both online or off, including the venue at Palácio dos
            Correios and our Slack channels. Projects created at the
            hackathon are equally subject to the code of conduct. Anyone who
            violates this code of conduct may be sanctioned or expelled from
            these spaces at the discretion of the members of staff.
          </p>

          <h2>Participar</h2>
          <p>
            O registo na plataforma está limitado a estudantes (ou
            ex-estudantes) do curso de PROGRAMACAO. Para entrar, regista-te
            com o teu email da FEUP (<code>xxxxxx@.fe.up.pt</code>). Se já
            não tiveres acesso a nenhum email institucional, contacta-nos
            para resolvermos a situação.
          </p>

          <p>
            Caso já tenhas acabado o curso, gostariamos de contar com a tua
            participacao para apoiar estudantes. Entra em contacto connosco
            atraves do email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> para te
            adicionarmos à plataforma.
          </p>
        </section>

        {
          this.state.registered ?
            this.renderRegisteredMessage() :
            <div className="pure-g">
              <div className="pure-u-1-1 pure-u-sm-1-2 u-sm-pr-2">
                <SignUp onSuccess={this.onSubmit} />
              </div>
              <div className="pure-u-1-1 pure-u-sm-1-2">
                <Login />
              </div>
            </div>
        }

        <section>
          <h2>{t("contact.title")}</h2>
          <p dangerouslySetInnerHTML={{ __html: t("contact.content", { email: contactEmail })}} />
        </section>
      </div>
    );
  }
}

export default compose(
  translate([ "home" ]),
)(Home);
