import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";

import { contactEmail } from "globals";

class Conduct extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className="posts">
        <section className="post">
          <h1 className="post-title">{t("title")}</h1>

          <ul>
            {t("rules", {returnObjects: true}).map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>

          <h2>{t("questions")}</h2>
          <p>
            {t("contact")}:&nbsp;
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </section>
      </div>
    );
  }
}

export default compose(
  translate([ "conduct" ]),
)(Conduct);
