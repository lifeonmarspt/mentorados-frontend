import React from "react";

class Table extends React.Component {

  render() {
    return (
      <table className="pure-table pure-table-bordered pure-table-editable-vertical">
        <tbody>
        {this.props.data.map((dat, n) =>
          (<tr key={n}>
            <th>{dat[0]}</th>
            <td>{dat[1]}</td>
          </tr>)
        )}
        </tbody>
        <tfoot>
          <tr className="pure-table-odd">
            <td colSpan="2">
              <div className="pure-control-group">
                {this.props.children}
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default Table;
