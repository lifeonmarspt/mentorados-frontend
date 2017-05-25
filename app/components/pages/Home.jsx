import React from "react";
import { Link } from "react-router-dom";

import SignUpForm from "components/forms/SignUpForm";
import Login from "components/elements/Login";
import Section from "components/elements/Section";


class Home extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { registered: false };
  }

  onSubmit(event) {
    this.setState({ registered: event.email });
  }

  renderRegisteredMessage() {
    return (
      <Section>
        Registration sent! Check your email at <code>{this.state.registered}</code> for confirmation instructions!
      </Section>
    );
  }

  render() {
    return (
      <div className="posts">
        <section className="post">
          <header className="post-header">
            <h2 className="post-title">Programa de Mentorados de Engenharia Informática - FEUP</h2>
          </header>
          <div className="post-description">
            <p>
              The access to this page is exclusive to students enrolled in
              FEUP's magical pony training club. If you have a <code>fe.up.pt</code>
              email, go ahead and sign up.
            </p>
          </div>
        </section>

        {
          this.state.registered ?
            this.renderRegisteredMessage() :
            <div className="pure-g">
              <div className="pure-u-1-2">
                <SignUpForm onSuccess={this.onSubmit.bind(this)} />
              </div>
              <div className="pure-u-1-2">
                <Login />
              </div>
            </div>
        }
      </div>
    );
  }
}

export default Home;
