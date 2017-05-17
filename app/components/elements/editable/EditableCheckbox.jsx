import React from "react";
import PropTypes from "prop-types";

class EditableCheckbox extends React.Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    fieldMetadata: PropTypes.object.isRequired,
    value: PropTypes.any,
  };

  onChange(choice, e) {
    let newValue;
    if (e.target.checked) {
      newValue = (this.props.value || []).concat(choice);
    } else {
      newValue = this.props.value.filter((v) => v.id !== choice.id);
    }
    this.props.onChange(newValue);
  }

  render() {
    return (
      <fieldset>
        {this.props.fieldMetadata.editableChoices.map((choice, n) => {
          let isChecked = (this.props.value || []).findIndex((c) => c.id === choice.id) > -1;
          return (<label key={n} htmlFor={`checkbox-choices-${this.props.fieldMetadata.id}-${choice.id}`} className="pure-checkbox">
            <input id={`checkbox-choices-${this.props.fieldMetadata.id}-${choice.id}`} type="checkbox" value={choice.id} checked={isChecked} onChange={this.onChange.bind(this, choice)} />
            {choice.description}
          </label>);
        })}
      </fieldset>
    );
  }
}

export default EditableCheckbox;
