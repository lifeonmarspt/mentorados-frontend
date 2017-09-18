import React from "react";
import PropTypes from "prop-types";

import Errors from "reactAdmin/components/Errors";

class EditableText extends React.Component {
  static propTypes = {
    resource: PropTypes.object,
    field: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
  };

  render() {
    return (
      <div className="editable-text">
        <input
          onChange={(e) => this.props.onChange(e.target.value)}
          className="pure-input"
          type="text"
          value={this.props.resource[this.props.field] || ""}
        />
        <Errors errors={this.props.errors[this.props.field]} />
        {JSON.stringify(this.props.errors)}
      </div>
    );
  }
}

export default EditableText;
