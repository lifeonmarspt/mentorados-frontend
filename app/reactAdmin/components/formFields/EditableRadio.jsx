import React from "react";
import PropTypes from "prop-types";

import Errors from "reactAdmin/components/Errors";

class EditableRadio extends React.Component {
  static propTypes = {
    resource: PropTypes.object.isRequired,
    field: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
  };

  static contextTypes = {
    choices: PropTypes.array.isRequired,
  }

  render() {
    return (
      <fieldset>
        {this.context.choices.map((choice, n) => {
          let isChecked = choice.id === this.props.resource[this.props.field];
          return (
            <label
              key={n}
              htmlFor={`radio-choices-${this.props.field}-${choice.id}`}
              className="pure-checkbox"
            >
              <input
                id={`radio-choices-${this.props.field}-${choice.id}`}
                type="radio"
                value={choice.id}
                checked={isChecked}
                onChange={(e) => this.props.onChange(e.target.value)}
              />
              {choice.description}
            </label>
          );
        })}
        <Errors errors={this.props.errors[this.props.field]} />
      </fieldset>
    );
  }
}

export default EditableRadio;
