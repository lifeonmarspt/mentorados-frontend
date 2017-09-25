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
    const { onChange, resource, field, errors } = this.props;

    return (
      <div className="editable-text">
        <input
          onChange={(e) => onChange(e.target.value)}
          className="pure-input"
          type="text"
          value={resource[field] || ""}
        />
        <Errors errors={errors[field]} />
        {errors.length > 0 && JSON.stringify(errors)}
      </div>
    );
  }
}

export default EditableText;
