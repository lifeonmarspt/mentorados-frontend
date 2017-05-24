import React from "react";
import { Link } from "react-router-dom";

import SignUpForm from "components/forms/SignUpForm";
import Login from "components/elements/Login";


class Home extends React.Component {
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

        <div className="pure-g">
          <div className="pure-u-1-2">
            <SignUpForm />
          </div>
          <div className="pure-u-1-2">
            <Login />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
