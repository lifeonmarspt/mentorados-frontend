import React from 'react'
import { Link } from 'react-router-dom';

import { postConfirmation } from "../../api/mentors";

class Confirmation extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      confirmed: false,
      error: null,
    };

  }

  doConfirm() {
    postConfirmation(this.props.match.params.id, this.props.match.params.token)
      .then((result) => {
        this.setState({ confirmed: true });
      })
      .catch((error) => {
        this.setState({ error: error.response.statusText });
      });
  }

  renderErrors() {
    console.log("kek", this.state.error)
    return this.state.error && (
      <aside className="error">
        {this.state.error}
      </aside>
    );
  }

  render() {
    let content = (!this.state.confirmed) ?
      <button className="pure-button" onClick={this.doConfirm.bind(this)}>Click here to confirm your registration.</button> :
      <p>Registration Confirmed!</p>;

    return (
      <div>
        <div className="posts">
          <section className="post">
            <header className="post-header">
              <h2 className="post-title">Registration Confirmation Massacration Violation</h2>
            </header>
            <div className="post-description">
              {content}
              {this.renderErrors()}
            </div>
          </section>
        </div>
      </div>
    )
  }

}

export default Confirmation;
