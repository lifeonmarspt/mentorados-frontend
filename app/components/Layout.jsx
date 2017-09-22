import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router";
import { Link } from "react-router-dom";

import Header from "components/Header";
import Footer from "components/Footer";
import Toaster from "components/Toaster";

class Layout extends React.Component {
  static contextTypes = {
    session: PropTypes.object
  }

  render() {
    return (
      <div id="layout">
        <Header />

        <Route path="/admin" component={() => (
            <nav>
              <ul>
                <li><Link to="/admin/users">Users</Link></li>
                <li><Link to="/admin/mentors">Mentors</Link></li>
              </ul>
            </nav>
          )}
        />

        {this.props.children}

        <Toaster />
        <Footer />
      </div>
    );
  }
}

export default Layout;
