import React from "react";
import PropTypes from "prop-types";

class EditableText extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    fieldMetadata: PropTypes.object.isRequired,
    value: PropTypes.any,
  };

  render() {
    //  <input onChange={this.onInputChange.bind(this, field)} className="pure-input" type="text" value={value} />
    return (
      <input onChange={(e) => this.props.onChange(e.target.value)} className="pure-input" type="text" value={this.props.value || ""} />
    );
  }
}

export default EditableText;
