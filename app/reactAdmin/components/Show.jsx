import React from "react";
import { Link } from "react-router-dom";

import Table from "reactAdmin/components/Table";
import Remote from "reactAdmin/components/Remote";

class Show extends Remote {
  componentWillMount() {
    this.remoteLoad();
  }

  destroy() {
  }

  render() {
    if (!this.state.resource.id) {
      return null;
    }

    const tableRows = this.tableComponents({ editable: false });

    return (
      <Table data={tableRows}>
        <Link to={this.props.routes.edit(this.props.resourceId)} className="pure-button pure-button-primary">Edit</Link>
        <Link to={this.props.routes.new()} className="pure-button pure-button-primary">New</Link>
        <button type="button" onClick={this.destroy.bind(this)} className="pure-button pure-button-primary">Destroy</button>
      </Table>
    );
  }
}

export default Show;
