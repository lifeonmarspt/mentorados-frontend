import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";

import Section from "components/elements/Section";
import RecoverPasswordForm from "components/forms/RecoverPasswordForm";

import { contactEmail } from "globals";

class RecoverPassword extends React.Component {
  state = {
    sent: false,
    email: "",
  }

  onSubmit = (email) => {
    this.setState({
      sent: true,
      email,
    });
  }

  render() {
    const { t } = this.props;
    const { sent, email } = this.state;

    return (
      <div className="posts">
        <section className="post">
          <header className="post-header">
            <h1 className="post-title">{t("recover_password:title")}</h1>
          </header>

          {sent &&
            <Section>
              <p>{t("reset_password:recovered.email1", { email })}</p>
              <p>{t("reset_password:recovered.email2")}</p>
            </Section>
          }

          {!sent && <RecoverPasswordForm onSuccess={this.onSubmit}/>}
        </section>

        <section>
          <h2>{t("home:contact.title")}</h2>

          <p dangerouslySetInnerHTML={{ __html: t("home:contact.content", { email: contactEmail }) }} />
        </section>
      </div>
    );
  }
}

export default compose(
  translate([ "home", "recover_password", "reset_password" ]),
)(RecoverPassword);
