import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";

import { addToast } from "actions/toasts";

class AuthenticatedRoute extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
    session: PropTypes.object,
  }

  componentWillMount() {
    const redir = this._redirect();
    if (redir) {
      this.context.router.history.replace(redir);
      this.props.addToast({ content: "Please log in before continuing.", level: "error" });
    }
  }

  componentWillReceiveProps(_, nextContext) {
    const redir = this._redirect(nextContext);
    if (redir) this.context.router.history.replace(redir);
  }

  _redirect(context = this.context) {
    if (!context.session.user.id) return "/";
    if (context.session.user.blocked) return "/blocked";

    return null;
  }

  render() {
    if (this._redirect()) return null;

    return <Route {...this.props} />;
  }

}

export default compose(
  connect(f => f, { addToast }),
)(AuthenticatedRoute);
