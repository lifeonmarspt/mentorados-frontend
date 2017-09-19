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

  handleGenderClick(gender) {
    this.setFilter("gender", gender.id);
  }

  handleCareerClick(career, checked) {
    const { careers } = this.props.filters;
    this.setFilter("careers", checked ? careers.concat([career.id]) : careers.filter((id) => id !== career.id));
  }

  handleInputChange(event) {
    this.setFilter("query", event.target.value);
  }

  render() {
    return (
      <form className="filters pure-form" onSubmit={e => e.preventDefault()}>
        <h1 className="content-subhead">Career Orientation</h1>
        <fieldset>
          {this.context.meta.careers.map((career, n) => (
            <div className="filter" key={n}>
            <label
              htmlFor={"filter-career-" + career.id}
              className="pure-checkbox"
            >
              {career.description} {}
            </label>
              <input
                id={"filter-career-" + career.id}
                type="checkbox"
                value={career.id}
                checked={(this.props.filters.careers ||  []).find((id) => id === career.id) ? true : false}
                onChange={(e) => this.handleCareerClick(career, e.target.checked)}
              />
            </div>
          ))}
        </fieldset>

        <h1 className="content-subhead">Search</h1>
        <fieldset>
          <input
            type="text"
            className="pure-input"
            value={this.props.filters.query}
            onChange={this.handleInputChange.bind(this)}
            placeholder="Search for name, bio, etc"
          />
        </fieldset>
      </form>
    );
  }
}

export default Filters;
