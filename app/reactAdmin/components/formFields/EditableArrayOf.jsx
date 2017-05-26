import React from "react";
import PropTypes from "prop-types";


const EditableArrayOf = (Component) => class extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    fieldMetadata: PropTypes.object.isRequired,
    resource: PropTypes.object,
    errors: PropTypes.array,
  };

  onChange(index, value) {
    this.props.onChange(
      this.props.resource[this.props.fieldMetadata.id].map(
        (v, i) => i == index ? value : v,
      ),
    );
  }

  onRemove(event, index) {
    event.preventDefault();

    this.props.onChange(
      this.props.resource[this.props.fieldMetadata.id].filter(
        (_, i) => i != index,
      ),
    );
  }

  onAddMore(event) {
    event.preventDefault();

    this.props.onChange(
      this.props.resource[this.props.fieldMetadata.id].concat([""]),
    );
  }

  render() {
    return (
      <div className="editable-array-of">
        {this.props.resource[this.props.fieldMetadata.id].map((element, n) =>
          <div key={n} className="editable-array-of-row">
            <Component
              onChange={(v) => this.onChange(n, v)}
              resource={{ [this.props.fieldMetadata.id]: element }}
              fieldMetadata={this.props.fieldMetadata}
              errors={this.props.error}
            />
            <a href="" onClick={(e) => this.onRemove(e, n)}>Remove</a>
          </div>
        )}
        <a href="" onClick={this.onAddMore.bind(this)}>Add more</a>
      </div>
    );
  }
};

export default EditableArrayOf;
