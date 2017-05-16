import React from "react";

import { getMentors } from "lib/api";
import Mentor from "components/elements/Mentor";
import Section from "components/elements/Section";

class Mentors extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      loading: true,
      mentors: []
    };
  }

  componentDidMount() {

    getMentors(this.props.filters).then((response) => this.setState({
      mentors: response.data,
      loading: false,
    }));

  }

  render() {

    let content = this.state.mentors.length > 0 ?
      this.state.mentors.map((mentor, n) => <Mentor key={n} mentor={mentor} />) :
      (<Section title="Oops...">
        <p>No mentors found for the specified criteria</p>
      </Section>);


    return !this.state.loading && (
      <div className="posts">
        <h1 className="content-subhead">Mentores</h1>
        {content}
      </div>
    );
  }

}

export default Mentors;
