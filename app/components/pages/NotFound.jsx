import React from "react";

import Section from "components/elements/Section";

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
    );
  }

}

export default NotFound;
