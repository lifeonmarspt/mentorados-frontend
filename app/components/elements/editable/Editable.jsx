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
    this.state.changes[field] = event.target.value;
    this.state.data[field] = event.target.value;
    this.setState(this.state);
  }

  onCheckboxClick(field, event) {
    let isChecked = field.getValue(this.state.data).findIndex((v) => v == event.target.value) >= 0;

    if (!isChecked) {
      this.state.changes[field].push(event.target.value);
      this.state.data[field].push(event.target.value);
    } else {
      let i;
      i = this.state.changes[field].indexOf(event.target.value);
      if (i >= 0) {
        this.state.changes[field].splice(i, 1);
      }

      i = this.state.data[field].indexOf(event.target.value);
      if (i >= 0) {
        this.state.data[field].splice(i, 1);
      }
    }
    this.setState(this.state);
    console.log(this.state, event.target);
  }

  getTableComponent(field) {
    if (!this.state.editing) {
      return field.displayAs(this.state.data);
    }

    let value = (field.getValue || field.displayAs)(this.state.data);

    switch (field.editableAs) {
    case "text":
      return (
        <input onChange={this.onInputChange.bind(this, field.id)} className="pure-input" type="text" value={value} />
      );

    case "textarea":
      return (
        <textarea onChange={this.onInputChange.bind(this, field.id)} className="pure-input" type="text" value={value} />
      );

    case "select":
      return (
        <textarea onChange={this.onInputChange.bind(this, field.id)} className="pure-input" type="text" value={value} />
      );

    case "radio":
      return (
        <fieldset>
          {field.editableChoices.map((choice, n) => {
            let isChecked = choice.id === value;
            return (<label key={n} htmlFor={`radio-choices-${choice.id}`} className="pure-checkbox">
              <input id={`radio-choices-${choice.id}`} type="radio" value={choice.id} checked={isChecked} onChange={this.onInputChange.bind(this, field.id)} />
              {choice.description}
            </label>);
          })}
        </fieldset>
      );

    case "checkbox":
      return (
        <fieldset>
          {field.editableChoices.map((choice, n) => {
            let isChecked = value.findIndex((v) => v === choice.id) >= 0;
            return (<label key={n} htmlFor={`checkbox-choices-${choice.id}`} className="pure-checkbox">
              <input id={`checkbox-choices-${choice.id}`} type="checkbox" value={choice.id} checked={isChecked} onChange={this.onCheckboxClick.bind(this, field.id)} />
              {choice.description}
            </label>);
          })}
        </fieldset>
      );

    default:
      return field.displayAs(this.state.data);

    }
  }

  remoteLoad() {
    return this.props.remoteActions.load(this.props.resourceId)
      .then((response) => {
        this.setState({
          loading: false,
          data: response.data
        });
      });
  }

  remoteSave() {
    return this.props.remoteActions.save(this.props.resourceId, this.state.changes)
      .then((response) => {
        this.setState({
          loading: false,
          data: response.data
        });
      });
  }

  remoteCreate() {
    return this.props.remoteActions.create(this.state.changes)
      .then((response) => {
        this.setState({
          loading: false,
          data: response.data
        });
      });
  }

  remoteDestroy() {
    return this.props.remoteActions.destroy(this.props.resourceId)
      .then((response) => {
        this.setState({
          loading: false,
          data: response.data
        });
      });
  }

}

export default Editable;
