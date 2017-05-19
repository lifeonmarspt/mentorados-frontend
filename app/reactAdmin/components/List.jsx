import React from "react";

import { ShowComponent } from 'reactAdmin/helpers'


class List extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  componentDidMount() {
    this.props.actions.list().then((response) => {
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
            {this.props.displayFieldNames.map((fieldName, n) =>
              <th key={n}>{this.field(fieldName).label}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {this.state.resources.map((row, n) => (
            <tr key={n}>
              {this.props.displayFieldNames.map((fieldName, n) => (
                <td key={n}>
                  <ShowComponent
                    fieldMetadata={this.field(fieldName)}
                    resource={row}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default List;
