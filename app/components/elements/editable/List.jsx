import React from "react";

class List extends React.Component {

  constructor(...args) {
    super(...args);
  }

  componentDidMount() {

  }

  render() {
    return (
      <table className="pure-table pure-table-bordered pure-table-editable-horizontal">
          <thead>
              <tr>
                {this.props.displayFieldNames.map((fieldName, n) =>
                  <th key={n}>{this.props.fields.find((f) => f.id === fieldName).label}</th>
                )}
              </tr>
          </thead>
          <tbody>
            {this.props.data.map((row, n) =>
              (<tr key={n}>
                {this.props.displayFieldNames.map((fieldName, n) => {
                  let field = this.props.fields.find((f) => f.id === fieldName);
                  return (
                    <td key={n}>
                      {field.displayAs ? field.displayAs(row) : row[field.id]}
                    </td>);
                })}
              </tr>)
            )}
          </tbody>
      </table>
    );
  }
}

export default List;
