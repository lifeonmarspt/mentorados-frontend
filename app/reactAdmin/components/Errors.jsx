import React from "react";
import PropTypes from "prop-types";

class Errors extends React.Component {
  static propTypes = {
    errors: PropTypes.array,
  };

  render() {
    const errors = this.props.errors || [];

    if (errors.length === 0) {
      return null;
    }

    return (
      <ul className="pure-form-field-error">
        {this.props.errors.map(
          (error, n) => <li key={n}>{error}</li>
        )}
      </ul>
    );
  }
}

export default Errors;
