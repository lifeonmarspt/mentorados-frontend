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

  onInputChange(fieldMetadata, value) {
    this.setState({
      resource: {
        ...this.state.resource,
        [fieldMetadata.id]: value,
      },
      changes: {
        ...this.state.changes,
        [fieldMetadata.id]: value,
      },
    });
  }

  tableComponents({ editable, }) {
    const Component = (editable ? EditComponent : ShowComponent);

    return this.props.fields.map((field) => ({
      label: field.label,
      field: <Component
        fieldMetadata={field}
        resource={this.state.resource}
        onChange={this.onInputChange.bind(this, field)}
        errors={this.state.errors[field.id]}
      />,
    }));
  }

  remoteLoad() {
    return this.props.actions.show(this.props.resourceId).then((response) => {
      this.setState({ resource: response.data, });
      return response;
    });
  }

  remoteUpdate() {
    return this.props.actions.update(
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
    return this.props.actions.create(
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
    return this.props.actions.destroy(this.props.resourceId);
  }
}

export default Remote;
