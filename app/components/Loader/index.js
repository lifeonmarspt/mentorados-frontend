import "./styles";

import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";

export const Loader = ({ t }) => (
  <div className="Loader">
    <div className="Loader-spinner">
      <span>{t("loading")}</span>
    </div>
  </div>
);

export default compose(
  translate([ "layout" ]),
)(Loader);
