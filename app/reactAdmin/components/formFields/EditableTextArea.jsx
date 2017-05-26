import React from "react";
import PropTypes from "prop-types";

import Errors from "reactAdmin/components/Errors";

class EditableTextArea extends React.Component {
  static propTypes = {
    resource: PropTypes.object.isRequired,
    field: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
  };

  render() {
    return (
      <div>
        <textarea
          onChange={(e) => this.props.onChange(e.target.value)}
          className="pure-input"
          type="text"
          value={this.props.resource[this.props.field] || ""}
        />
        <Errors errors={this.props.errors[this.props.field]} />
      </div>
    );
  }
}

export default EditableTextArea;
