import React from "react";
import { Link } from "react-router-dom";

import Table from "reactAdmin/components/Table";
import Remote from "reactAdmin/components/Remote";

class Show extends Remote {
  componentWillMount() {
    this.remoteLoad();
  }

  render() {
    if (!this.state.resource.id) {
      return null;
    }

    const tableRows = this.tableComponents({ editable: false });

    return (
      <Table data={tableRows}>
        <Link to={this.props.routes.index()} className="pure-button pure-button-primary">Back</Link>
        <Link to={this.props.routes.edit(this.props.resourceId)} className="pure-button pure-button-primary">Edit</Link>
        <Link to={this.props.routes.delete(this.props.resourceId)} className="pure-button pure-button-primary">Delete</Link>
      </Table>
    );
  }
}

export default Show;
