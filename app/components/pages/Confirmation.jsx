import React from 'react'
import { Link } from 'react-router-dom';

import { errorTransform }  from '../../lib/errorTransform';
import { postConfirmation } from "../../api/mentors";
import FormError from "../elements/FormError";

class Confirmation extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      confirmed: false,
      errors: {},
    };

  }

  doConfirm() {
    postConfirmation(this.props.match.params.id, this.props.match.params.token)
      .then((result) => {
        this.setState({ confirmed: true });
      })
      .catch((error) => {
        this.setState({ errors: errorTransform(error, { 404: 'confirmation token not found' }) });
      });
  }


  render() {

    // @todo wat
    let content = (!this.state.confirmed) ?
      <button className="pure-button" onClick={this.doConfirm.bind(this)}>Confirm Registration</button> :
      <p>Registration Confirmed!</p>;

    let errorContent= (this.state.errors.serverError) ?
      <FormError error={this.state.errors.serverError} /> :
      content;

    return (
      <div>
        <div className="posts">
          <section className="post">
            <header className="post-header">
              <h2 className="post-title">Registration Confirmation</h2>
            </header>
            <div className="post-description">
              <div className="pure-g">
                <div className="pure-u-1-3">
                  <p>Please use the buttom below to confirm your registration.</p>
                </div>
                <div className="pure-u-2-3"></div>
              </div>
              <div className="pure-g">
                <div className="pure-u-1-3">
                  {errorContent}
                </div>
                <div className="pure-u-2-3"></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }

}

export default Confirmation;
