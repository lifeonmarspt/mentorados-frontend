import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";
import { tList } from "lib/translate";

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
          {tList("p", t, "introduction")}

          <h2>{t("participate.title")}</h2>
          {tList("p", t, "participate.how-to", {dangerouslySetInnerHTML: true}, {email: contactEmail})}

          <h2>{t("conduct.title")}</h2>
          <p dangerouslySetInnerHTML={{ __html: t("conduct.content")}} />
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
