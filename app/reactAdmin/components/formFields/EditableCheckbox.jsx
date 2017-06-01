import React from "react";
import PropTypes from "prop-types";

import Errors from "reactAdmin/components/Errors";

class EditableCheckbox extends React.Component {
  static propTypes = {
    resource: PropTypes.object.isRequired,
    field: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
  };

  render() {
    return (
      <div className="editable-checkbox">
        <input
          id={`checkbox-${this.props.field}`}
          type="checkbox"
          value="1"
          checked={this.props.resource[this.props.field]}
          onChange={(e) => this.props.onChange(e.target.checked)}
        />
        <Errors errors={this.props.errors[this.props.field]} />
      </div>
    );
  }
}

export default EditableCheckbox;
