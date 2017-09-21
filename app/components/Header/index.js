import "./styles";

import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { translate } from "react-i18next";

import { Link } from "react-router-dom";

class Header extends React.Component {
  static contextTypes = {
    session: PropTypes.object,
  }

  render() {
    const { t } = this.props;

    return (
      <header className="Header">
        <Link className="brand-tagline" to="/">
          {t("tagline")}
        </Link>

        <div className="user-pane">
          {this.context.session.user &&
            <Link className="pure-button pure-button-primary" to="/account">
              {t("profile")}
            </Link>
          }

          {this.context.session.user && this.context.session.user.admin &&
            <Link className="pure-button" to="/admin">
              {t("admin")}
            </Link>
          }

          {this.context.session.user &&
            <button className="pure-button pure-button-error" onClick={this.context.session.doLogout}>
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
