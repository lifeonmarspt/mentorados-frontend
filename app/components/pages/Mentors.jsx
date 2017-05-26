import React from "react";
import { Route } from "react-router";

import { getMentors } from "lib/api";
import Mentor from "components/elements/Mentor";
import Section from "components/elements/Section";
import Filters from "components/elements/Filters"
import debounce from "debounce";


const sortByKey = (array, keyFunction) => (
  [].concat(array).sort((a, b) => {
    const ak = keyFunction(a);
    const bk = keyFunction(b);

    if (ak < bk) return -1;
    if (bk < ak) return +1;
    return 0;
  })
);

class Mentors extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      loading: true,
      mentors: [],
      filters: {
        query: "",
        gender: "A",
        careers: [],
      },
    };

    this.debouncedReloadMentors = debounce(this.reloadMentors, 300);
  }

  componentDidMount() {
    this.reloadMentors(this.props.filters);
  }

  filtersDidChange(filters) {
    this.setState({ filters });

    this.debouncedReloadMentors(filters);
  }

  reloadMentors(filters) {
    this.getMentorsPromise = getMentors(filters).then((response) => this.setState({
      mentors: sortByKey(response.data, (m) => m.name),
      loading: false,
    }));
  }

  componentWillUnmount() {
    this.getMentorsPromise.cancel();
  }

  render() {
    return (
      <div id="layout" className="pure-g">
        <div className="pure-u-1 pure-u-md-6-24">
          <Filters filters={this.state.filters} onFilterChange={this.filtersDidChange.bind(this)} />
        </div>

        <div className="pure-u-1 pure-u-md-18-24 posts">
          <h1 className="content-subhead">Mentors</h1>
          {
            this.state.loading ?
              null :
            this.state.mentors.length == 0 ?
              <Section title="Oops...">
                <p>No mentors found for the specified criteria</p>
              </Section> :
              this.state.mentors.map(
                (mentor) => <Mentor key={mentor.id} mentor={mentor} />
              )}
        </div>
      </div>
    );
  }
}

export default Mentors;
