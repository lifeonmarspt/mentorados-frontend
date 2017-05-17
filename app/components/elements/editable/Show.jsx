import React from "react";
import { Link } from "react-router-dom";

import Editable from "components/elements/editable/Editable";

class Show extends Editable {

  componentWillMount() {
    this.remoteLoad();
  }

  destroy() {
    
  }

  render() {
    return (!this.state.loading) && (
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
                <Link to={this.props.routes.edit(this.props.resourceId)} className="pure-button pure-button-primary">Edit</Link>
                <Link to={this.props.routes.new()} className="pure-button pure-button-primary">New</Link>
                <button type="button" onClick={this.destroy.bind(this)} className="pure-button pure-button-primary">Destroy</button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }

}

export default Show;
