import "./styles";

import React from "react";
import PropTypes from "prop-types";

class Filters extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    meta: PropTypes.object,
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
    const { careers, traits } = this.props.filters;

    return (
      <form className="Filters pure-form" onSubmit={e => e.preventDefault()}>

        <h1 className="content-subhead">Search</h1>
        <fieldset>
          <input
            type="text"
            className="pure-input"
            value={this.props.filters.query}
            onChange={this.handleInputChange}
            placeholder="Search for name, bio, etc"
          />
        </fieldset>

        <h1 className="content-subhead">Personal Traits</h1>
        <fieldset>
          {this.context.meta.traits.map(trait => (
            <div className="filter" key={trait.id}>
              <label htmlFor={`filter-trait-${trait.id}`} className="pure-checkbox">
                {trait.description}
              </label>
              <input
                id={`filter-trait-${trait.id}`}
                type="checkbox"
                value={trait.id}
                checked={traits.find(id => id === trait.id) ? true : false}
                onChange={e => this.handleFilterClick("traits", trait, e.target.checked)}
              />
            </div>
          ))}
        </fieldset>

        <h1 className="content-subhead">Career Orientation</h1>
        <fieldset>
          {this.context.meta.careers.map((career, n) => (
            <div className="filter" key={n}>
              <label htmlFor={`filter-career-${career.id}`} className="pure-checkbox">
                {career.description}
              </label>
              <input
                id={`filter-career-${career.id}`}
                type="checkbox"
                value={career.id}
                checked={careers.find(id => id === career.id) ? true : false}
                onChange={e => this.handleFilterClick("careers", career, e.target.checked)}
              />
            </div>
          ))}
        </fieldset>

      </form>
    );
  }
}

export default Filters;
