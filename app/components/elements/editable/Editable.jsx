import React from "react";
import PropTypes from "prop-types";


class Editable extends React.Component {

  constructor(...args) {
    if (new.target === Editable) {
      throw new TypeError("Cannot construct instance directly");
    }

    super(...args);

    this.state = {
      loading: !!this.props.resourceId,
      editing: !this.props.resourceId,
      data: {},
      changes: {}
    };

    this.onClickEditToggle = this.onClickEditToggle.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickDestroy = this.onClickDestroy.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.remoteLoad = this.remoteLoad.bind(this);
    this.remoteCreate = this.remoteCreate.bind(this);
    this.remoteSave = this.remoteSave.bind(this);
    this.remoteDestroy = this.remoteDestroy.bind(this);
    this.getTableComponent = this.getTableComponent.bind(this);
  }

  onClickEditToggle(event) {
    event.preventDefault();
    this.setState({ editing: !this.state.editing });
  }

  onClickSave(event) {
    event.preventDefault();

    let action = this.props.resourceId ? this.remoteSave : this.remoteCreate;
    action()
      .then(() => {
        this.setState({
          editing: false
        });
      });
  }

  onClickDestroy(event) {
    event.preventDefault();
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

    let value = this.state.data[field.id];

    if (!this.state.editing) {
      return field.displayAs ? field.displayAs(this.state.data) : value;
    }

    if (field.editableAs) {
      return (
        <field.editableAs fieldMetadata={field} onChange={this.onInputChange.bind(this, field)} value={value} />
      );
    }

    return field.displayAs ? field.displayAs(this.state.data) : value;

  }

  remoteLoad() {
    return this.props.actions.load(this.props.resourceId)
      .then((response) => {
        this.setState({
          loading: false,
          data: response.data
        });
      });
  }

  remoteSave() {
    return this.props.actions.save(this.props.resourceId, this.state.changes)
      .then((response) => {
        this.setState({
          loading: false,
          data: response.data
        });
      });
  }

  remoteCreate() {
    return this.props.actions.create(this.state.changes)
      .then((response) => {
        this.setState({
          loading: false,
          data: response.data
        });
      });
  }

  remoteDestroy() {
    return this.props.actions.destroy(this.props.resourceId)
      .then((response) => {
        this.setState({
          loading: false
        });
      });
  }

}

export default Editable;
