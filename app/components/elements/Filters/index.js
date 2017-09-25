import "./styles";

import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { translate } from "react-i18next";
import { connect } from "react-redux";

class Filters extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  setFilter(field, value) {
    this.setState({ [field]: value });

    this.props.onFilterChange({
      ...this.props.filters,
      [field]: value,
    });
  }

  handleInputChange = (event) => {
    this.setFilter("query", event.target.value);
  }

  handleFilterClick(type, resource, checked) {
    const selected = this.props.filters[type];

    this.setFilter(type, checked ? selected.concat([resource.id]) : selected.filter(id => id !== resource.id));
  }

  render() {
    const { t, meta, filters } = this.props;

    return (
      <form className="Filters pure-form" onSubmit={e => e.preventDefault()}>

        <h1 className="content-subhead">{t("filters.search.title")}</h1>
        <fieldset>
          <input
            type="text"
            className="pure-input"
            value={filters.query}
            onChange={this.handleInputChange}
            placeholder={t("filters.search.placeholder")}
          />
        </fieldset>

        <h1 className="content-subhead">{t("filters.traits.title")}</h1>
        <fieldset>
          {meta.traits.map(trait => (
            <div className="filter" key={trait.id}>
              <label htmlFor={`filter-trait-${trait.id}`} className="pure-checkbox">
                {trait.description}
              </label>
              <input
                id={`filter-trait-${trait.id}`}
                type="checkbox"
                value={trait.id}
                checked={filters.traits.find(id => id === trait.id) ? true : false}
                onChange={e => this.handleFilterClick("traits", trait, e.target.checked)}
              />
            </div>
          ))}
        </fieldset>

        <h1 className="content-subhead">{t("filters.careers.title")}</h1>
        <fieldset>
          {meta.careers.map((career, n) => (
            <div className="filter" key={n}>
              <label htmlFor={`filter-career-${career.id}`} className="pure-checkbox">
                {career.description}
              </label>
              <input
                id={`filter-career-${career.id}`}
                type="checkbox"
                value={career.id}
                checked={filters.careers.find(id => id === career.id) ? true : false}
                onChange={e => this.handleFilterClick("careers", career, e.target.checked)}
              />
            </div>
          ))}
        </fieldset>

      </form>
    );
  }
}

export default compose(
  translate([ "mentors" ]),

  connect(({ meta }) => ({ meta })),
)(Filters);
