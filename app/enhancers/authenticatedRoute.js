import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { translate } from "react-i18next";

import { addErrorToast } from "actions/toasts";

const authenticatedRoute = (Component) => compose(
  connect(
    ({ currentUser }) => ({ currentUser }),
    {
      addErrorToast,
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
      // only show toast if we're not logging out
      const withToast = !!(this.props.currentUser.id && nextProps.currentUser.id);

      this.redirect(nextProps, withToast);
    }

    redirect(props = this.props, withToast = true) {
      if (!this.shouldRedirect(props)) return;

      const { addErrorToast, t } = this.props;

      if (withToast) addErrorToast(t("needs_login"));
      this.context.router.history.push("/");
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
