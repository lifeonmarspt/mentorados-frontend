import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Table from "reactAdmin/components/Table";
import Remote from "reactAdmin/components/Remote";

class New extends Remote {
  static contextTypes = {
    router: PropTypes.object,
  }

  create(event) {
    event.preventDefault();

    this.remoteCreate().then((resource) => {
      if (success) {
        this.context.router.history.push(this.props.routes.show(resource.id));
      }
    });
  }

  render() {
    const tableRows = this.tableComponents({ editable: true });

    return (
      <form className="pure-form" onSubmit={this.create.bind(this)}>
        <Table data={tableRows}>
          <Link to={this.props.routes.index()} className="pure-button pure-button-primary">Cancel</Link>
          <button type="submit" className="pure-button pure-button-primary">Save</button>
        </Table>
      </form>
    );
  }
}

export default New;
