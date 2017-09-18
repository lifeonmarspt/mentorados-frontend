import React from "react";
import PropTypes from "prop-types";

import { Route } from "react-router-dom";


class AdminRoute extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    session: PropTypes.object,
  }

  componentDidMount() {
    if (!this.context.session.user.admin) {
      this.context.router.history.replace("/");
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (!nextContext.session.user.admin) {
      this.context.router.history.replace("/");
    }
  }

  render() {
    return <Route {...this.props} />;
  }
}

export default AdminRoute;
