import "./styles";

import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { translate } from "react-i18next";
import isEmpty from "lodash.isempty";

import { Link } from "react-router-dom";

class Header extends React.Component {
  static contextTypes = {
    session: PropTypes.object,
  }

  render() {
    const { t } = this.props;
    const { user, doLogout } = this.context.session;

    return (
      <header className="Header">
        <Link className="brand-tagline" to="/">
          {t("tagline")}
        </Link>

        <div className="user-pane">
          {!isEmpty(user) &&
            <Link className="pure-button pure-button-primary" to="/account">
              {t("profile")}
            </Link>
          }

          {!isEmpty(user) && user.admin &&
            <Link className="pure-button" to="/admin">
              {t("admin")}
            </Link>
          }

          {!isEmpty(user) &&
            <button className="pure-button pure-button-error" onClick={doLogout}>
              {t("logout")}
            </button>
          }
        </div>
      </header>
    );
  }
}

export default compose(
  translate([ "header" ]),
)(Header);
