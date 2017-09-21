import "./styles";

import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";

export const Footer = ({ t }) => (
  <footer dangerouslySetInnerHTML={{ __html: t("copy") }} />
);

export default compose(
  translate([ "footer" ]),
)(Footer);
