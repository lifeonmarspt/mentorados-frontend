import React from "react";

class FieldError extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    if (!this.props.errors) {
      return null;
    }

    return (
      <ul className="pure-menu-list">
        {this.props.errors.map((error, n) =>
          (<li key={n}>
            <span className="pure-form-message pure-form-field-error">
              {this.props.fieldName} {error}
            </span>
          </li>)
        )}
      </ul>
    );
  }
}

export default FieldError;
