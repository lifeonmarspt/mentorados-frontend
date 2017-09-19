import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";


class UserPane extends React.Component {
  static contextTypes = {
    session: PropTypes.object,
  }

  render() {
    return (
      <div className="user-pane">
        {
          this.context.session.user &&
            <Link className="pure-button" to="/account">
              Profile
            </Link>
        }

        {
          this.context.session.user && this.context.session.user.admin &&
            <Link className="pure-button" to="/admin">
              Admin
            </Link>
        }

        {
          this.context.session.user &&
            <button
              onClick={this.context.session.doLogout}
              className="pure-button"
            >
              Logout
            </button>
        }
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <header className="navigation">
        <Link className="brand-tagline" to="/">
          AlumniEI Mentorship Program
        </Link>
        <UserPane />
      </header>
    );
  }
}

export default Header;
