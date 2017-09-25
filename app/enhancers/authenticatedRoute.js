import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { translate } from "react-i18next";

import { addToast, TOAST_LEVEL_ERROR } from "actions/toasts";

const authenticatedRoute = (Component) => compose(
  connect(f => f, { addToast }),

  translate([ "toasts" ]),
)(
  class AuthenticatedRoute extends React.Component {

    static contextTypes = {
      router: PropTypes.object,
      session: PropTypes.object,
    }

    //
    // Lifecycle
    //
    componentWillMount() {
      this.redirect();
    }

    componentWillReceiveProps(_, nextContext) {
      this.redirect(nextContext);
    }

    //
    // Helpers
    //
    redirect(context = this.context) {
      if (!this.shouldRedirect(context)) return;

      const { addToast, t } = this.props;

      let route;
      if (!context.session.user.id) route = "/";
      if (context.session.user.blocked) route = "/blocked";

      context.router.history.replace(route);
      addToast({ content: t("needs_login"), level: TOAST_LEVEL_ERROR });
    }

    shouldRedirect(context = this.context) {
      const { user } = context.session;

      return !user.id || user.blocked;
    }

    //
    // Render
    //
    render() {
      if (this.shouldRedirect(this.context)) return null;

      return <Component {...this.props} />;
    }
  }
);

export default authenticatedRoute;
