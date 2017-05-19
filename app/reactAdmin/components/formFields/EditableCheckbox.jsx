import React from "react";
import PropTypes from "prop-types";

import Errors from "reactAdmin/components/Errors";

class EditableCheckbox extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    fieldMetadata: PropTypes.object.isRequired,
    resource: PropTypes.object.isRequired,
    errors: PropTypes.array,
  };

  onChange(e) {
    this.props.onChange(e.target.checked);
  }

  checked() {
    return this.props.resource[this.props.fieldMetadata.id];
  }

  render() {
    return (
      <fieldset>
        <input
          id={`checkbox-${this.props.fieldMetadata.id}`}
          type="checkbox"
          value="1"
          checked={this.checked()}
          onChange={this.onChange.bind(this)}
        />
        <Errors errors={this.props.errors} />
      </fieldset>
    );
  }
}

export default EditableCheckbox;
