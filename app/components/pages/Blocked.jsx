import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";

export const Blocked = ({ t }) => (
  <div className="pure-g">
    <div className="pure-u-1">
      {t("copy")}
    </div>
  </div>
);

export default compose(
  translate([ "blocked" ]),
)(Blocked);
