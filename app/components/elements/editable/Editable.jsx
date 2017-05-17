import React from "react";

class Editable extends React.Component {

  constructor(...args) {
    if (new.target === Editable) {
      throw new TypeError("Cannot construct instance directly");
    }

    super(...args);

    this.state = {
      loading: true,
      editing: false,
      data: {},
      changes: {}
    };

    this.onClickEditToggle = this.onClickEditToggle.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickDestroy = this.onClickDestroy.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.transformRemoteToLocal = this.transformRemoteToLocal.bind(this);
    this.transformLocalToRemote = this.transformLocalToRemote.bind(this);
    this.remoteLoad = this.remoteLoad.bind(this);
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

  onInputChange(field, event) {
    this.setState({
      data: {
        ...this.state.data,
        [field.id]: event.target.value,
      },
      changes: {
        ...this.state.changes,
        [field.id]: event.target.value,
      },
    });
  }

  onCheckboxChange(field, choiceId) {
    this.setState({
      data: {
        ...this.state.data,
        [field.id]: this.state.data[field.id].map((choice) => ({
          ...choice,
          checked: (choice.id === choiceId)  ? !choice.checked : choice.checked,
        })),
      }
    });
  }

  getTableComponent(field) {

    if (!this.state.editing) {
      return field.displayAs(this.state.data);
    }

    let value = (field.getValue || field.displayAs)(this.state.data);

    switch (field.editableAs) {
    case "text":
      return (
        <input onChange={this.onInputChange.bind(this, field)} className="pure-input" type="text" value={value} />
      );

    case "textarea":
      return (
        <textarea onChange={this.onInputChange.bind(this, field)} className="pure-input" type="text" value={value} />
      );

    case "select":
      return (
        <textarea onChange={this.onInputChange.bind(this, field)} className="pure-input" type="text" value={value} />
      );

    case "radio":
      return (
        <fieldset>
          {field.editableChoices.map((choice, n) => {
            let isChecked = choice.id === value;
            return (<label key={n} htmlFor={`radio-choices-${choice.id}`} className="pure-checkbox">
              <input id={`radio-choices-${choice.id}`} type="radio" value={choice.id} checked={isChecked} onChange={this.onInputChange.bind(this, field)} />
              {choice.description}
            </label>);
          })}
        </fieldset>
      );

    case "checkbox":
      console.log(JSON.stringify(this.state.data[field.id]));
      return (
        <fieldset>
          {this.state.data[field.id].map((choice, n) => {
            return (<label key={n} htmlFor={`checkbox-choices-${choice.id}`} className="pure-checkbox">
              <input id={`checkbox-choices-${choice.id}`} type="checkbox" value={choice.id} checked={choice.checked} onChange={this.onCheckboxChange.bind(this, field, choice.id)} />
              {choice.description}
            </label>);
          })}
        </fieldset>
      );

    default:
      return field.displayAs(this.state.data);

    }
  }

  transformRemoteToLocal(data) {
    /* iterate over this editable components' fields and see which values in data need transformations */
    /* remote data that feeds checkboxes needs to be joined with the full range of options as the server only returns the active choices */
    this.props.fields.forEach((field) => {
      switch (field.editableAs) {
      case "checkbox":
        data[field.id] = field.editableChoices.map((choice) => {
          choice.checked = (data[field.id].findIndex((d) => d.id === choice.id) > -1);
          return choice;
        });
        break;
      }
    });

    return data;
  };

  transformLocalToRemote(data) {

  };

  remoteLoad() {
    return this.props.remoteActions.load(this.props.resourceId)
      .then((response) => {
        this.setState({
          loading: false,
          data: this.transformRemoteToLocal(response.data)
        });
      });
  }

  remoteSave() {
    return this.props.remoteActions.save(this.props.resourceId, this.state.changes)
      .then((response) => {
        this.setState({
          loading: false,
          data: this.transformRemoteToLocal(response.data)
        });
      });
  }

  remoteCreate() {
    return this.props.remoteActions.create(this.state.changes)
      .then((response) => {
        this.setState({
          loading: false,
          data: this.transformRemoteToLocal(response.data)
        });
      });
  }

  remoteDestroy() {
    return this.props.remoteActions.destroy(this.props.resourceId)
      .then((response) => {
        this.setState({
          loading: false
        });
      });
  }

}

export default Editable;
