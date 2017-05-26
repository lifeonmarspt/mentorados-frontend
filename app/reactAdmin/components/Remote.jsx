import React from "react";

import { ShowComponent, EditComponent } from 'reactAdmin/helpers'


class Remote extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      resource: {},
      changes: {},
      errors: {},
    };
  }

  onInputChange(field, value) {
    this.setState({
      resource: {
        ...this.state.resource,
        [field]: value,
      },
      changes: {
        ...this.state.changes,
        [field]: value,
      },
    });
  }

  field(id) {
    return this.props.metadata.fields[id];
  }

  tableComponents({ editable, }) {
    const Component = (editable ? EditComponent : ShowComponent);

    const columns = this.props.metadata[editable ? "editColumns" : "showColumns"];

    return columns.map((fieldName) => ({
      label: this.field(fieldName).label,
      field: <Component
        resource={this.state.resource}
        field={fieldName}
        metadata={this.props.metadata}
        onChange={this.onInputChange.bind(this, fieldName)}
        errors={this.state.errors}
      />,
    }));
  }

  remoteLoad() {
    return this.props.metadata.actions.show(this.props.resourceId).then((response) => {
      this.setState({ resource: response.data, });
      return response;
    });
  }

  remoteUpdate() {
    return this.props.metadata.actions.update(
      this.props.resourceId,
      this.state.changes,
    ).then(
      (response) => response.data,
    ).catch(
      (e) => {
        this.setState({ errors: e.response.data });
        return false;
      },
    )
  }

  remoteCreate() {
    return this.props.metadata.actions.create(
      this.state.changes,
    ).then(
      (response) => response.data,
    ).catch(
      (e) => {
        this.setState({ errors: e.response.data });
        return false;
      },
    );
  }

  remoteDestroy() {
    return this.props.metadata.actions.destroy(this.props.resourceId);
  }
}

export default Remote;
