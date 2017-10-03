import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { translate } from "react-i18next";
import { connect } from "react-redux";

import { password_recovery_tokens } from "lib/api";
import Section from "components/elements/Section";
import ResetPasswordForm from "components/forms/ResetPasswordForm";
import RecoverPasswordForm from "components/forms/RecoverPasswordForm";

import { addSuccessToast } from "actions/toasts";

class ResetPassword extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  state = {
    loading: true,
  }

  componentWillMount() {
    password_recovery_tokens.get(
      this.props.match.params.token,
    ).then(
      (response) => this.setState({ loading: false, valid: true, user: response.data.user }),
    ).catch(
      () => this.setState({ loading: false, valid: false }),
    );
  }

  onSuccessfulReset = (data) => {
    const { addSuccessToast, t } = this.props;

    addSuccessToast(t("toasts:reset_pw_success"));
  }

  onSuccessfulRecover = (email) => {
    this.setState({ recovered: email });
  }

  render() {
    const { t, match } = this.props;
    const { loading, valid, recovered, user } = this.state;

    if (loading) {
      return null;
    }

    return (
      <div className="posts">
        <section className="post">
          <header className="post-header">
            <h1 className="post-title">
              {recovered || !valid ? t("already_reset.title") : t("not_reset.title")}
            </h1>
          </header>

          {recovered || !valid &&
            <Section>
              <p>{t("already_reset.subtitle")}</p>
            </Section>
          }

          {recovered &&
            <Section>
              <p>{t("recovered.email1", { email: recovered })}</p>
              <p>{t("recovered.email2")}</p>
            </Section>
          }

          {!valid &&
            <Section>
              <RecoverPasswordForm onSuccess={this.onSuccessfulRecover} />
            </Section>
          }

          {!recovered && valid &&
            <Section>
              <ResetPasswordForm
                token={match.params.token}
                user={user}
                onSuccess={this.onSuccessfulReset}
              />
            </Section>
          }
        </section>
      </div>
    );
  }
}

export default compose(
  translate([ "reset_password", "toasts" ]),

  connect(
    () => ({}),
    {
      addSuccessToast,
    },
  ),
)(ResetPassword);
