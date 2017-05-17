import React from "react";
import PropTypes from "prop-types";

class EditableRadio extends React.Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    fieldMetadata: PropTypes.object.isRequired,
    value: PropTypes.any.isRequired,
  };

  render() {
    return (
      <fieldset>
        {this.props.fieldMetadata.editableChoices.map((choice, n) => {
          let isChecked = choice.id === this.props.value;
          return (<label key={n} htmlFor={`radio-choices-${this.props.fieldMetadata.id}-${choice.id}`} className="pure-checkbox">
            <input id={`radio-choices-${this.props.fieldMetadata.id}-${choice.id}`} type="radio" value={choice.id} checked={isChecked} onChange={(e) => this.props.onChange(e.target.value)} />
            {choice.description}
          </label>);
        })}
      </fieldset>
    );
  }
}

export default EditableRadio;
