import React from "react";
import PropTypes from "prop-types";

import Errors from "reactAdmin/components/Errors";

class EditableCheckbox extends React.Component {
  static propTypes = {
    resource: PropTypes.object.isRequired,
    field: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.array,
  };

  onChange(e) {
    this.props.onChange(e.target.checked);
  }

  checked() {
    return this.props.resource[this.props.field];
  }

  render() {
    return (
      <fieldset>
        <input
          id={`checkbox-${this.props.field}`}
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
