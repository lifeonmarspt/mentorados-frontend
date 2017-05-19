import React from "react";
import PropTypes from "prop-types";

import Errors from "reactAdmin/components/Errors";

class EditableCheckboxList extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    fieldMetadata: PropTypes.object.isRequired,
    resource: PropTypes.object.isRequired,
    errors: PropTypes.array,
  };

  onChange(choice, e) {
    let newValue;
    if (e.target.checked) {
      newValue = this.value().concat(choice);
    } else {
      newValue = this.value().filter((v) => v.id !== choice.id);
    }
    this.props.onChange(newValue);
  }

  value() {
    return this.props.resource[this.props.fieldMetadata.id] || [];
  }

  render() {
    return (
      <fieldset>
        {this.props.fieldMetadata.editableChoices.map((choice, n) => {
          let isChecked = this.value().findIndex((c) => c.id === choice.id) > -1;
          return (
            <label
              key={n}
              htmlFor={`checkbox-choices-${this.props.fieldMetadata.id}-${choice.id}`}
              className="pure-checkbox"
            >
              <input
                id={`checkbox-choices-${this.props.fieldMetadata.id}-${choice.id}`}
                type="checkbox"
                value={choice.id}
                checked={isChecked}
                onChange={this.onChange.bind(this, choice)}
              />
            {choice.description}
          </label>);
        })}
        <Errors errors={this.props.errors} />
      </fieldset>
    );
  }
}

export default EditableCheckboxList;

