import React from "react";
import { Link } from "react-router-dom";

import { ShowComponent } from 'reactAdmin/helpers'


class List extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  componentDidMount() {
    this.props.actions.index().then((response) => {
      this.setState({ resources: response.data, });
    });
  }

  field(id) {
    return this.props.fields.find((f) => f.id === id);
  }

  render() {
    if (!this.state.resources) {
      return null;
    }

    return (
      <table className="pure-table pure-table-bordered pure-table-editable-horizontal">
        <thead>
          <tr>
            {this.props.listColumns.map((fieldName, n) =>
              <th key={n}>{this.field(fieldName).label}</th>
            )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.resources.map((row, n) => (
            <tr key={n}>
              {this.props.listColumns.map((fieldName, n) => (
                <td key={n}>
                  <ShowComponent
                    fieldMetadata={this.field(fieldName)}
                    resource={row}
                  />
                </td>
              ))}
              <td>
                <Link to={this.props.routes.show(row.id)}>Show</Link> {
                } | {
                } <Link to={this.props.routes.edit(row.id)}>Edit</Link> {
                } | {
                } <Link to={this.props.routes.delete(row.id)}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="pure-table-odd">
            <td colSpan={this.props.listColumns.length + 1}>
              <div className="pure-control-group">
                <Link to="/admin" className="pure-button pure-button-primary">Cancel</Link>
                <Link to={this.props.routes.new()} className="pure-button pure-button-primary">New</Link>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default List;
