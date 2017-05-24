import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Table from "reactAdmin/components/Table";
import Remote from "reactAdmin/components/Remote";

class Delete extends Remote {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentWillMount() {
    this.remoteLoad();
  }

  destroy() {
    this.remoteDestroy().then(
      () => this.context.router.history.push(this.props.routes.index())
    )
  }

  render() {
    if (!this.state.resource.id) {
      return null;
    }

    const tableRows = this.tableComponents({ editable: false });

    return (
      <div>
        <h1>Deleting thingamajig</h1>
        <Table data={tableRows}>
          <Link to={this.props.routes.show(this.props.resourceId)} className="pure-button pure-button-primary">Cancel</Link>
          <button type="button" onClick={this.destroy.bind(this)} className="pure-button pure-button-primary">Destroy</button>
        </Table>
      </div>
    );
  }
}

export default Delete;
