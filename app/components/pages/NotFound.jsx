import React from "react"
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import PageMessage from "../elements/PageMessage";

class NotFound extends React.Component {

  render() {
    return (
      <div>
        <div className="posts">
          <PageMessage title="Oops...">
            <p>Not Found!</p>
          </PageMessage>
        </div>
      </div>
    )
  }

}

export default NotFound;
