import React from "react";

class DataSheet extends React.Component {

  constructor(...args) {
    super(...args);
  }

  componentDidMount() {

  }

  render() {
    return (
      <table className="pure-table pure-table-bordered pure-table-datasheet">
        <tbody>
        {this.props.fields.map((field, n) =>
          (<tr key={n}>
            <th>{field.label}</th>
            <td>{field.get(this.props.data)}</td>
          </tr>)
        )}
        </tbody>
      </table>
    );
  }

}

export default DataSheet;
