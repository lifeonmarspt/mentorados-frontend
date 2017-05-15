import React from "react"
import PropTypes from "prop-types";

import { getCareers } from "../../lib/api";

class Filters extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
    session: PropTypes.object,
  }

  constructor(...args) {
    super(...args);

    this.state = {
      loading: true,
      filters: {
        string: "",
        genders: [
          { id: "A", description: "All", checked: true },
          { id: "F", description: "Female" },
          { id: "M", description: "Male" }
        ],
        careers: []
      }
    };
  }

  componentDidMount() {

    getCareers().
      then((response) => {
        this.state.loading = false;
        this.state.filters.careers = response.data.map((career) => (career["checked"] = true, career));
        this.setState(this.state);
      })

  }

  handleInputClick(filterType, event) {
    console.log(filterType, event.target.value, this.state.filters[filterType]);

    // @todo pls refactor
    if (filterType === 'genders') {
      this.state.filters.genders.forEach((item) => item.checked = false);
    }

    this.state.filters[filterType].forEach((item) => {
      if (item.id == event.target.value) {
        item.checked = !item.checked;
      }
    });

    this.setState(this.state);
  }

  handleInputChange(event) {
    this.state.filters.string = event.target.value;
    this.setState(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.context.router.history.replace('/mentors');
    this.props.doFilters(this.state.filters);
  }

  render() {
    return !this.state.loading && (
      <form className="pure-form" onSubmit={this.handleSubmit.bind(this)}>
        <h1 className="content-subhead">Gender</h1>
        <fieldset>
          {this.state.filters.genders.map((gender, n) =>
            <label key={n} htmlFor={"filter-gender-" + gender.id} className="pure-checkbox">
              {gender.description} <input id={"filter-gender-" + gender.id} type="radio" name="filter-gender" value={gender.id} checked={gender.checked} onChange={this.handleInputClick.bind(this, 'genders')} />
            </label>
          )}
        </fieldset>
        <h1 className="content-subhead">Career Orientation</h1>
        <fieldset>
          {this.state.filters.careers.map((career, n) =>
            <label key={n} htmlFor={"filter-career" + career.id} className="pure-checkbox">
              {career.description} <input id={"filter-career" + career.id} type="checkbox" value={career.id} checked={career.checked} onChange={this.handleInputClick.bind(this, 'careers')} />
            </label>
          )}
        </fieldset>
        <h1 className="content-subhead">Search</h1>
        <fieldset>
          <input type="text" className="pure-input" value={this.state.filters.string} onChange={this.handleInputChange.bind(this)} />
        </fieldset>
        <fieldset>
          <button type="submit" className="pure-button">Search</button>
        </fieldset>
        <h1 className="content-subhead">User</h1>
        <fieldset>
          <p>{this.context.session.state.user.email}</p>
          <button onClick={this.context.session.doLogout} className="pure-button pure-button-primary">Logout</button>
        </fieldset>
      </form>
    )
  }
}

export default Filters;
