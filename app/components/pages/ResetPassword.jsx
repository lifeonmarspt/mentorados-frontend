import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { getResetPasswordToken } from "lib/api";
import Section from "components/elements/Section";
import ResetPasswordForm from "components/forms/ResetPasswordForm";
import RecoverPasswordForm from "components/forms/RecoverPasswordForm";


class ResetPassword extends React.Component {
  static contextTypes = {
    session: PropTypes.object
  }

  constructor(...args) {
    super(...args);

    this.state = { loading: true };
  }

  componentWillMount() {
    getResetPasswordToken(
      this.props.match.params.token,
    ).then(
      (response) => this.setState({ loading: false, valid: true, user: response.data }),
    ).catch(
      () => this.setState({ loading: false, valid: false }),
    )
  }

  onSuccessfulReset(data) {
    this.context.session.doLogin(data);
  }

  onSuccessfulRecover(email) {
    this.setState({ recovered: email });
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    if (this.state.recovered) {
      return (
        <div className="page-registration">
          <Section title="Password already reset">
            <p>To reset your password again, please enter your email address below.</p>
          </Section>

          <Section>
            <p>
              We've sent an email to <code>{this.state.recovered}</code>. Click
              the link in the email to reset your password.
            </p>

            <p>
              If you don't see the email, check other places it might be, like your
              junk, spam, social, or other folders.
            </p>
          </Section>
        </div>
      );
    }

    if (!this.state.valid) {
      return (
        <div className="page-registration">
          <Section title="Password already reset">
            <p>To reset your password again, please enter your email address below.</p>

            <div className="pure-g">
              <div className="pure-u-1-5">
                <RecoverPasswordForm
                  onSuccess={this.onSuccessfulRecover.bind(this)}
                />
              </div>
            </div>
          </Section>
        </div>
      );
    }

    return (
      <div className="page-registration">
        <Section title="Reset password">
          <div className="pure-g">
            <div className="pure-u-1-5">
              <ResetPasswordForm
                token={this.props.match.params.token}
                user={this.state.user}
                onSuccess={this.onSuccessfulReset.bind(this)}
              />
            </div>
          </div>
        </Section>
      </div>
    );
  }
}

export default ResetPassword;
