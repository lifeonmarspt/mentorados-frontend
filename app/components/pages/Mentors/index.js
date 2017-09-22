import "./styles";

import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";

import { getMentors } from "lib/api";
import Mentor from "components/elements/Mentor";
import Section from "components/elements/Section";
import Filters from "components/elements/Filters";
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
      filters: {
        query: "",
        traits: [],
        careers: [],
      },
    };

    this.debouncedReloadMentors = debounce(this.reloadMentors, 300);
  }

  componentDidMount() {
    this.reloadMentors(this.props.filters);
  }

  componentWillUnmount() {
    this.debouncedReloadMentors.clear();
  }

  filtersDidChange = (filters) => {
    this.setState({ filters });

    this.debouncedReloadMentors(filters);
  }

  reloadMentors(filters) {
    this.setState({ loading: true });

    this.getMentorsPromise = getMentors(filters)
      .then((response) => {
        this.setState({
          mentors: sortByKey(response.data, (m) => m.name),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.getMentorsPromise.cancel();
  }

  render() {
    const { t } = this.props;
    const { mentors } = this.state;

    return (
      <div className="Mentors pure-g">
        <div className="pure-u-1 pure-u-md-6-24">
          <Filters filters={this.state.filters} onFilterChange={this.filtersDidChange} />
        </div>

        <div className="pure-u-1 pure-u-md-18-24 posts">
          <h1 className="content-subhead">
            {t("list.title")}
            {this.state.loading && <strong> {t("list.loading")}</strong>}
          </h1>

          {mentors && mentors.length === 0 && (
            <Section title={t("list.not_found.title")}>
              <p>{t("list.not_found.notice")}</p>
            </Section>
          )}

          {mentors && mentors.map(m => <Mentor key={m.id} mentor={m} />)}
        </div>
      </div>
    );
  }
}

export default compose(
  translate([ "mentors" ]),
)(Mentors);
