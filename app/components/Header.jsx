import React from "react"
import PropTypes from "prop-types";

import { Link } from "react-router-dom";


class UserPane extends React.Component {
  static contextTypes = {
    session: PropTypes.object,
  }

  render() {
    return (
      <div className="pure-u-1-2 user-pane">
        {
          this.context.session.user &&
            <Link className="pure-button pure-button" to="/account">
              {this.context.session.user.email}
            </Link>
        }

        {
          this.context.session.user && this.context.session.user.admin &&
            <Link to="/admin">
              <button className="pure-button pure-button">Admin</button>
            </Link>
        }

        {
          this.context.session.user &&
            <button
              onClick={this.context.session.doLogout}
              className="pure-button pure-button"
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
      <header>
        <div className="pure-u-1-2 brand-tagline">
          <Link to="/">AlumniEI</Link> {}
          Mentorship Program
        </div>
        <UserPane />
      </header>
    );
  }
}

export default Header;
