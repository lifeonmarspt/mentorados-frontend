import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Editable from "components/elements/editable/Editable";

class Edit extends Editable {

  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(...args) {
    super(...args);
    this.state = {
      ...this.state,
      editing: true,
    };
  }

  componentWillMount() {
    this.remoteLoad();
  }

  update(event) {
    event.preventDefault();

    this.remoteUpdate().then((result) => {
      this.context.router.history.push(this.props.routes.show(result.data.id));
    });
  }

  render() {
    return (!this.state.loading) && (
      <form className="pure-form" onSubmit={this.update.bind(this)}>
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
                  <Link to={this.props.routes.show(this.props.resourceId)} className="pure-button pure-button-primary">Cancel</Link>
                  <button type="submit" className="pure-button pure-button-primary">Save</button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    );
  }

}

export default Edit;
