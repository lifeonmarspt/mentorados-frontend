import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";

const anonymousRoute = (Component) => compose(
  connect(({ currentUser }) => ({ currentUser })),
)(
  class AnonymousRoute extends React.Component {

    static contextTypes = {
      router: PropTypes.object,
    }

    componentDidMount() {
      if (this.props.currentUser.id) {
        this.context.router.history.replace("/mentors");
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.currentUser.id) {
        this.context.router.history.replace("/mentors");
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }
);

export default anonymousRoute;
