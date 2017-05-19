import React from "react";
import PropTypes from "prop-types";

import Errors from "reactAdmin/components/Errors";

class EditableRadio extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    fieldMetadata: PropTypes.object.isRequired,
    resource: PropTypes.object.isRequired,
    errors: PropTypes.array,
  };

  render() {
    return (
      <fieldset>
        {this.props.fieldMetadata.editableChoices.map((choice, n) => {
          let isChecked = choice.id === this.props.resource[this.props.fieldMetadata.id];
          return (
            <label
              key={n}
              htmlFor={`radio-choices-${this.props.fieldMetadata.id}-${choice.id}`}
              className="pure-checkbox"
            >
              <input
                id={`radio-choices-${this.props.fieldMetadata.id}-${choice.id}`}
                type="radio"
                value={choice.id}
                checked={isChecked}
                onChange={(e) => this.props.onChange(e.target.value)}
              />
              {choice.description}
            </label>
          );
        })}
        <Errors errors={this.props.errors} />
      </fieldset>
    );
  }
}

export default EditableRadio;
