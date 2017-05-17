import React from "react";

class Editable extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      loading: !!this.props.resourceId,
      editing: !this.props.resourceId,
      data: {},
      changes: {}
    };
  }

  onInputChange(fieldMetadata, value) {
    this.setState({
      data: {
        ...this.state.data,
        [fieldMetadata.id]: value,
      },
      changes: {
        ...this.state.changes,
        [fieldMetadata.id]: value,
      },
    });
  }

  getTableComponent(field) {
    const display = (field, value) => (field.displayAs ? field.displayAs(this.state.data) : value);

    const EditComponent = field.editableAs || (({ fieldMetadata, value }) => {
      const ReadComponent = display(fieldMetadata, value);

      if (Array.isArray(ReadComponent)) {
        return <div>{ReadComponent}</div>;
      } else if (ReadComponent) {
        return ReadComponent;
      } else {
        return null;
      }

    });

    let value = this.state.data[field.id];

    if (!this.state.editing) {
      return display(field, value);
    }

    return (
      <EditComponent fieldMetadata={field} onChange={this.onInputChange.bind(this, field)} value={value} />
    );
  }


  remoteLoad() {
    return this.props.actions.load(this.props.resourceId)
      .then((response) => {
        this.setState({
          loading: false,
          data: response.data
        });
        return response;
      });
  }

  remoteUpdate() {
    return this.props.actions.update(this.props.resourceId, this.state.changes);
  }

  remoteCreate() {
    return this.props.actions.create(this.state.changes);
  }

  remoteDestroy() {
    return this.props.actions.destroy(this.props.resourceId)
      .then((response) => {
        this.setState({
          loading: false
        });
        return response;
      });
  }

}

export default Editable;
