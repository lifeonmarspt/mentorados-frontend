import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Table from "components/elements/editable/Table";
import Editable from "components/elements/editable/Editable";

class New extends Editable {

  static contextTypes = {
    router: PropTypes.object,
  }

  create(event) {
    event.preventDefault();
    this.remoteCreate().then((result) => {
      this.context.router.history.push(this.props.routes.show(result.data.id));
    });
  }

  render() {
    const tableRows = this.props.fields.map((field) => [field.label, this.getTableComponent(field)]);

    return (!this.state.loading) && (
      <form className="pure-form" onSubmit={this.create.bind(this)}>
        <Table data={tableRows}>
          <Link to={this.props.routes.list()} className="pure-button pure-button-primary">Cancel</Link>
          <button type="submit" className="pure-button pure-button-primary">Save</button>
        </Table>
      </form>
    );
  }
}

export default New;
