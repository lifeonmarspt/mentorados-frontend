import React from "react";
import PropTypes from "prop-types";

const EditableArrayOf = (Component) => class extends React.Component {
  static propTypes = {
    resource: PropTypes.object,
    field: PropTypes.string.isRequired,
    metadata: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
  };

  onChange(index, value) {
    this.props.onChange(
      this.props.resource[this.props.field].map(
        (v, i) => i === index ? value : v,
      ),
    );
  }

  onRemove(event, index) {
    event.preventDefault();

    this.props.onChange(
      this.props.resource[this.props.field].filter(
        (_, i) => i !== index,
      ),
    );
  }

  onAddMore(event) {
    event.preventDefault();

    this.props.onChange(
      this.props.resource[this.props.field].concat([""]),
    );
  }

  render() {
    return (
      <div className="editable-array-of">
        {(this.props.resource[this.props.field] || []).map((element, n) => (
          <div key={n} className="editable-array-of-row">
            <Component
              resource={{ [this.props.field]: element }}
              field={this.props.field}
              metadata={this.props.metadata}
              onChange={(v) => this.onChange(n, v)}
              errors={this.props.errors}
            />
            <a href="" onClick={(e) => this.onRemove(e, n)}>Remove</a>
          </div>
        ))}
        <a href="" onClick={this.onAddMore.bind(this)}>Add more</a>
      </div>
    );
  }
};

export default EditableArrayOf;
