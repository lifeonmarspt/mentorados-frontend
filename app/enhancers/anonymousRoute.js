import React from "react";
import PropTypes from "prop-types";

const anonymousRoute = (Component) => (
  class AnonymousRoute extends React.Component {

    static contextTypes = {
      router: PropTypes.object,
      session: PropTypes.object,
    }

    componentDidMount() {
      if (this.context.session.user.id) {
        this.context.router.history.replace("/mentors");
      }
    }

    componentWillReceiveProps(nextProps, nextContext) {
      if (nextContext.session.user.id) {
        this.context.router.history.replace("/mentors");
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }
);

export default anonymousRoute;
