import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Table from "reactAdmin/components/Table";
import Remote from "reactAdmin/components/Remote";

class Edit extends Remote {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentWillMount() {
    this.remoteLoad();
  }

  update(event) {
    event.preventDefault();

    this.remoteUpdate().then((success) => {
      if (success) {
        this.context.router.history.push(this.props.routes.show(this.props.resourceId));
      }
    });
  }

  render() {
    if (!this.state.resource.id) {
      return null;
    }

    const tableRows = this.tableComponents({ editable: true });

    return (
      <form className="pure-form" onSubmit={this.update.bind(this)}>
        <Table data={tableRows}>
          <Link to={this.props.routes.show(this.props.resourceId)} className="pure-button pure-button-primary">Cancel</Link>
          <button type="submit" className="pure-button pure-button-primary">Save</button>
        </Table>
      </form>
    );
  }
}

export default Edit;
