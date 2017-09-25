import React from "react";
import PropTypes from "prop-types";

const adminRoute = (Component) => (
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
      return <Component {...this.props} />;
    }
  }
);

export default adminRoute;

