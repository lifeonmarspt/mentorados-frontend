import "./styles";

import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { logout } from "actions/session";

class Header extends React.Component {

  render() {
    const { t, currentUser, logout } = this.props;

    return (
      <header className="Header">
        <Link className="brand-tagline" to="/">
          {t("tagline")}
        </Link>

        <div className="user-pane">
          {currentUser.id &&
            <Link className="pure-button pure-button-primary" to="/account">
              {t("profile")}
            </Link>
          }

          {currentUser.admin &&
            <Link className="pure-button" to="/admin">
              {t("admin")}
            </Link>
          }

          {currentUser.id &&
            <button className="pure-button pure-button-error" onClick={logout}>
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

  connect(
    ({ currentUser }) => ({ currentUser }),
    {
      logout,
    },
  ),
)(Header);
