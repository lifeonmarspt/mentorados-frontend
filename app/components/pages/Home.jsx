import React from "react";

import SignUp from "components/forms/SignUp";
import Login from "components/elements/Login";


const email = "mentoria@alumniei.pt";

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
    return (
      <div className="posts">
        <section className="post">
          <h1 className="post-title">Programa de Mentorados de Engenharia Informática - FEUP</h1>
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
            atraves do email <a href={`mailto:${email}`}>{email}</a> para te
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

export default Home;
