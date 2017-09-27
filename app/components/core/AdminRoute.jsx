import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";

class AdminRoute extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    if (!this.props.currentUser.admin) {
      this.context.router.history.replace("/");
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (!nextProps.currentUser.admin) {
      this.context.router.history.replace("/");
    }
  }

  render() {
    return <Route {...this.props} />;
  }
}

export default compose(
  connect(({ currentUser }) => ({ currentUser })),
)(AdminRoute);
