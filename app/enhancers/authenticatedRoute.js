import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { translate } from "react-i18next";

import { addToast, TOAST_LEVEL_ERROR } from "actions/toasts";

const authenticatedRoute = (Component) => compose(
  connect(
    ({ currentUser }) => ({ currentUser }),
    {
      addToast,
    },
  ),

  translate([ "toasts" ]),
)(
  class AuthenticatedRoute extends React.Component {

    static contextTypes = {
      router: PropTypes.object,
    }

    componentWillMount() {
      this.redirect();
    }

    componentWillReceiveProps(nextProps) {
      this.redirect(nextProps);
    }

    redirect(props = this.props) {
      if (!this.shouldRedirect(props)) return;

      const { addToast, t } = this.props;

      this.context.router.history.push("/");
      addToast({ content: t("needs_login"), level: TOAST_LEVEL_ERROR });
    }

    shouldRedirect(props) {
      return !props.currentUser.id;
    }

    render() {
      if (this.shouldRedirect(this.props)) return null;

      return <Component {...this.props} />;
    }
  }
);

export default authenticatedRoute;
