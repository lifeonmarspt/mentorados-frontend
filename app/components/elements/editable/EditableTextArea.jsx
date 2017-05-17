import React from "react";
import PropTypes from "prop-types";

class EditableTextArea extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    fieldMetadata: PropTypes.object.isRequired,
    value: PropTypes.any,
  };

  render() {
    return (
      <textarea onChange={(e) => this.props.onChange(e.target.value)} className="pure-input" type="text" value={this.props.value} />
    );
  }
}

export default EditableTextArea;
