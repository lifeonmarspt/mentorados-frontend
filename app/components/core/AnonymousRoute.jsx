import React from "react";
import PropTypes from "prop-types";

import { Route } from "react-router-dom";

class AnonymousRoute extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
    session: PropTypes.object,
  }

  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    if (this.context.session.state) {
      this.context.router.history.replace("/mentors");
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.session.state) {
      this.context.router.history.replace("/mentors");
    }
  }

  render() {
    return <Route {...this.props} />;
  }
}

export default AnonymousRoute;
