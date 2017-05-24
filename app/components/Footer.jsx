import React from "react"
import PropTypes from "prop-types";


class Footer extends React.Component {
  render() {
    return (
      <footer>
        Made with &#x2328; {}
        by <a href="https://lifeonmars.pt/">Life on Mars</a> {}
        for <a href="http://alumniei.fe.up.pt">AlumniEI</a>
      </footer>
    );
  }
}

export default Footer;
