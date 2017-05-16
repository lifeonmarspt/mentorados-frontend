import React from "react";

import Conditional from "components/core/Conditional";
import Editable from "components/elements/editable/Editable";

class EditableVertical extends Editable {

  constructor(...args) {
    super(...args);
  }

  componentWillMount() {
    this.remoteLoad();
  }

  render() {
    return (!this.state.loading) && (
      <form className="pure-form" onSubmit={this.onClickSave}>
        <table className="pure-table pure-table-bordered pure-table-editable-vertical">
          <tbody>
          {this.props.fields.map((field, n) =>
            (<tr key={n}>
              <th>{field.label}</th>
              <td>{this.getTableComponent(field)}</td>
            </tr>)
          )}
          </tbody>
          <tfoot>
            <tr className="pure-table-odd">
              <td colSpan="2">
                <div className="pure-control-group">
                  <button type="button" onClick={this.onClickEditToggle} className="pure-button pure-button-primary">{ this.state.editing ? "Cancel" : "Edit" }</button>
                  <Conditional condition={!this.state.editing}>
                    <button type="button" onClick={this.onClickEditNew} className="pure-button pure-button-primary">New</button>
                  </Conditional>
                  <Conditional condition={this.state.editing}>
                    <button type="submit" className="pure-button pure-button-primary">Save</button>
                    <button type="button" onClick={this.onClickDestroy} className="pure-button pure-button-primary">Destroy</button>
                  </Conditional>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    );
  }

}

export default EditableVertical;
