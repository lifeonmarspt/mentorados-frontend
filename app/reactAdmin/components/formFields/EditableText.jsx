import React from "react";
import PropTypes from "prop-types";

import Errors from "reactAdmin/components/Errors";

class EditableText extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    fieldMetadata: PropTypes.object.isRequired,
    resource: PropTypes.object,
    errors: PropTypes.array,
  };

  render() {
    return (
      <div>
        <input
          onChange={(e) => this.props.onChange(e.target.value)}
          className="pure-input"
          type="text"
          value={this.props.resource[this.props.fieldMetadata.id] || ""}
        />
        <Errors errors={this.props.errors} />
      </div>
    );
  }
}

export default EditableText;
