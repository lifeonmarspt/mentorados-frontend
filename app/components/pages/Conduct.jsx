import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";
import { tList } from "lib/translate";

import { contactEmail } from "globals";

class Conduct extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className="posts">
        <section className="post">
          <h1 className="post-title">{t("title")}</h1>

          <h2>{t("rights.title")}</h2>
          <p>{t("rights.description")}</p>
          <ul>
            {tList("li", t, "rights.rules")}
          </ul>

          <h2>{t("duties.title")}</h2>
          <p>{t("duties.description")}</p>
          <ul>
            {tList("li", t, "duties.rules")}
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
