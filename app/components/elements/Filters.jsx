import React from 'react'

class Filters extends React.Component {
  render() {
    return (
      <form className="pure-form">
        <h1 className="content-subhead">Gender</h1>
        <label for="filter-female" className="pure-checkbox">
          Female <input id="filter-female" type="radio" name="filter-gender" value="" />
        </label>
        <label for="filter-male" className="pure-checkbox">
          Male <input id="filter-male" type="radio" name="filter-gender" value="" />
        </label>

        <br/>

        <h1 className="content-subhead">Career Orientation</h1>
        {this.props.careers.map((career, n) =>
          <label for={"filter-career" + career.id} className="pure-checkbox">
              {career.description} <input id={"filter-career" + career.id} type="checkbox" value="" />
          </label>
        )}

        <br/>

        <h1 className="content-subhead">Search</h1>
        <input type="text" className="pure-input" />
      </form>

    )
  }
}

export default Filters;
