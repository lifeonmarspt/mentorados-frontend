import React from "react";

class DataTable extends React.Component {

  constructor(...args) {
    super(...args);
  }

  componentDidMount() {

  }

  render() {
    return (
      <table className="pure-table pure-table-bordered pure-table-datatable">
          <thead>
              <tr>
                {this.props.fields.map((field, n) =>
                  <th key={n}>{field.label}</th>
                )}
              </tr>
          </thead>
          <tbody>
            {this.props.data.map((row, n) =>
              (<tr key={n}>
                {this.props.fields.map((field, n) =>
                  (<td key={n}>
                    {field.get(row)}
                  </td>)
                )}
              </tr>)
            )}
          </tbody>
      </table>
    );
  }
}

export default DataTable;
