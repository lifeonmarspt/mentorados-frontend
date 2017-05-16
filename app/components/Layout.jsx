import React from "react"
import PropTypes from "prop-types";
import { Link } from "react-router-dom"

import { getCareers } from "lib/api"
import Filters from "components/elements/Filters"
import Login from "components/elements/Login"

class Layout extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
    session: PropTypes.object
  }

  render() {

    let sidebarContent = (!this.context.session.state) ?
      <Login /> :
      <Filters doFilters={this.props.doFilters} />;

    return (
      <div>
        <div id="layout" className="pure-g">
          <div className="sidebar pure-u-1 pure-u-md-4-24">
            <div className="header">
              <h1 className="brand"><Link to="/">AlumniEI</Link></h1>
              <h2 className="brand-tagline">Mentorship Program</h2>
            </div>
            <div className="filters">
              {sidebarContent}
            </div>
          </div>

          <div className="content pure-u-1 pure-u-md-20-24">
            {this.props.children}
            <div className="footer2">
              <p className="post-description">Made with 💩 by <a href="https://lifeonmars.pt/">Life on Mars</a> for <a href="http://alumniei.fe.up.pt">AlumniEI</a></p>
            </div>
          </div>
        </div>
      </div>
    )

  }

}

export default Layout;
