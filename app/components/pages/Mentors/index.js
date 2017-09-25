import "./styles";

import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import debounce from "debounce";

import Mentor from "components/elements/Mentor";
import Section from "components/elements/Section";
import Filters from "components/elements/Filters";

import { getMentors } from "actions/mentors";

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
  state = {
    loading: true,
    filters: {
      query: "",
      traits: [],
      careers: [],
    },
  }

  componentDidMount() {
    this.reloadMentors(this.props.filters);
  }

  componentWillUnmount() {
    this.reloadMentors.clear();
  }

  filtersDidChange = (filters) => {
    this.setState({ filters });

    this.reloadMentors(filters);
  }

  reloadMentors = debounce(filters => {
    this.setState({ loading: true });

    this.props
      .getMentors(filters)
      .finally(() => this.setState({ loading: false }));
  }, 300)

  render() {
    const { t, mentors } = this.props;
    const { loading } = this.state;

    return (
      <div className="Mentors pure-g">
        <div className="pure-u-1 pure-u-md-6-24">
          <Filters filters={this.state.filters} onFilterChange={this.filtersDidChange} />
        </div>

        <div className="pure-u-1 pure-u-md-18-24 posts">
          <h1 className="content-subhead">
            {t("list.title")}
            {loading && <strong> {t("list.loading")}</strong>}
          </h1>

          {!loading && mentors.length === 0 && (
            <Section title={t("list.not_found.title")}>
              <p>{t("list.not_found.notice")}</p>
            </Section>
          )}

          {mentors.map(m => <Mentor key={m.id} mentor={m} />)}
        </div>
      </div>
    );
  }
}

export default compose(
  translate([ "mentors" ]),

  connect(
    ({ mentors }) => ({ mentors: sortByKey(mentors, m => m.name) }),
    {
      getMentors,
    },
  ),
)(Mentors);
