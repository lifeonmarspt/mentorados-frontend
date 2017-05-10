import React from 'react'
import { Link } from 'react-router-dom'
import { getCareers } from '../api/mentors'

import Filters from './elements/Filters'

class Layout extends React.Component {

  render() {
    return (
      <div>
        <div id="layout" className="pure-g">
          <div className="sidebar pure-u-1 pure-u-md-1-5">
            <div className="header">
              <h1 className="brand-title">AlumniEI</h1>
              <h2 className="brand-tagline">Mentorship Program</h2>
            </div>
            <div className="filters">
              <Filters careers={this.props.careers} />
            </div>
          </div>

          <div className="content pure-u-1 pure-u-md-4-5">
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
