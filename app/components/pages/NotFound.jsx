import React from "react"
import { Link } from "react-router-dom";

import Section from "../elements/Section";

class NotFound extends React.Component {

  render() {
    return (
      <div>
        <div className="posts">
          <Section title="Oops...">
            <p>Not Found!</p>
          </Section>
        </div>
      </div>
    )
  }

}

export default NotFound;
