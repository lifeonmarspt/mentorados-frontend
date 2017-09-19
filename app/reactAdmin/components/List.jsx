import React from "react";
import { Link } from "react-router-dom";

import { ShowComponent } from "reactAdmin/helpers";


class List extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  componentDidMount() {
    this.props.metadata.actions.index().then((response) => {
      this.setState({ resources: response.data, });
    });
  }

  field(id) {
    return this.props.metadata.fields[id];
  }

  render() {
    if (!this.state.resources) {
      return null;
    }

    return (
      <table className="pure-table pure-table-bordered pure-table-editable-horizontal">
        <thead>
          <tr>
            {this.props.metadata.listColumns.map((fieldName, n) =>
              <th key={n}>{this.field(fieldName).label}</th>
            )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.resources.map((row, n) => (
            <tr key={n}>
              {this.props.metadata.listColumns.map((fieldName, n) => (
                <td key={n}>
                  <ShowComponent
                    resource={row}
                    field={fieldName}
                    metadata={this.props.metadata}
                  />
                </td>
              ))}
              <td>
                <Link to={this.props.metadata.routes.show(row.id)}>Show</Link> {
                } | {
                } <Link to={this.props.metadata.routes.edit(row.id)}>Edit</Link> {
                } | {
                } <Link to={this.props.metadata.routes.delete(row.id)}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="pure-table-odd">
            <td colSpan={this.props.metadata.listColumns.length + 1}>
              <div className="pure-control-group">
                <Link to="/admin" className="pure-button pure-button-primary">Cancel</Link>
                <Link to={this.props.metadata.routes.new()} className="pure-button pure-button-primary">New</Link>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default List;
