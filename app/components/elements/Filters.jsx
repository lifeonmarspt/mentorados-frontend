import React from 'react'

class Filters extends React.Component {

  constructor(...args) {
    super(...args);
    this.handle = this.handle.bind(this);
  }

  handle(e) {
    this.props.doFilters();
    e.preventDefault();
  }

  render() {
    return (
      <form className="pure-form" onSubmit={this.handle}>
        <h1 className="content-subhead">Gender</h1>
        <label htmlFor="filter-female" className="pure-checkbox">
          Female <input id="filter-female" type="radio" name="filter-gender" value="" />
        </label>
        <label htmlFor="filter-male" className="pure-checkbox">
          Male <input id="filter-male" type="radio" name="filter-gender" value="" />
        </label>

        <br/>

        <h1 className="content-subhead">Career Orientation</h1>
        {this.props.careers.map((career, n) =>
          <label key={n} htmlFor={"filter-career" + career.id} className="pure-checkbox">
              {career.description} <input id={"filter-career" + career.id} type="checkbox" value="" />
          </label>
        )}

        <br/>

        <h1 className="content-subhead">Search</h1>
        <input type="text" className="pure-input" />

        <br/>

        <h1 className="content-subhead">user crap</h1>
        <button onClick={this.props.doLogout} className="pure-button pure-button-primary">Logout</button>
      </form>
    )
  }
}

export default Filters;
