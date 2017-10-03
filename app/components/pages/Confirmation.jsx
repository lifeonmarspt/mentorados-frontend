import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Section from "components/elements/Section";
import ResetPasswordForm from "components/forms/ResetPasswordForm";

import { password_recovery_tokens } from "lib/api";

import { addSuccessToast } from "actions/toasts";

class Confirmation extends React.Component {
  state = {
    loading: true,
    valid: false,
    user: {},
  }

  componentWillMount() {
    password_recovery_tokens
    .get(this.props.match.params.token)
    .then(response =>
      this.setState({ loading: false, valid: true, user: response.data.user })
    )
    .catch(() =>
      this.setState({ loading: false, valid: false })
    );
  }

  onSuccessfulConfirm = () => {
    const { addSuccessToast, t } = this.props;

    addSuccessToast(t("toasts:account_confirmed"));
  }

  render() {
    const { t, match } = this.props;
    const { user, loading, valid } = this.state;

    if (loading) return <div>Loading...</div>;

    return (
      <div className="posts">
        <section className="post">
          <header className="post-header">
            <h2 className="post-title">{t("title")}</h2>
          </header>

          {!valid &&
            <Section>
              <p>
                {t("invalid_token.notice")}
                <br />
                <Link to="recover-password">{t("invalid_token.cta")}</Link>
              </p>
            </Section>
          }

          {valid &&
            <div>
              <Section>
                <p>{t("cta")}</p>
              </Section>

              <Section>
                <ResetPasswordForm
                  token={match.params.token}
                  user={user}
                  onSuccess={this.onSuccessfulConfirm}
                />
              </Section>
            </div>
          }
        </section>
      </div>
    );
  }

}

export default compose(
  translate([ "confirmation", "toasts" ]),

  connect(
    () => ({}),
    {
      addSuccessToast,
    },
  ),
)(Confirmation);
