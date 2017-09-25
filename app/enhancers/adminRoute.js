import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { translate } from "react-i18next";

import { addToast, TOAST_LEVEL_ERROR } from "actions/toasts";

const adminRoute = (Component) => compose(
  translate([ "toasts" ]),

  connect(
    ({ currentUser }) => ({ currentUser }),
    {
      addToast,
    }
  ),
)(
  class AdminRoute extends React.Component {
    static contextTypes = {
      router: PropTypes.object,
    }

    componentDidMount() {
      this.redirect();
    }

    componentWillReceiveProps(nextProps) {
      this.redirect(nextProps);
    }

    redirect(props = this.props) {
      const { currentUser, addToast, t } = props;

      if (!currentUser.admin) {
        addToast({ content: t("needs_admin"), level: TOAST_LEVEL_ERROR });
        this.context.router.history.replace("/");
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }
);

export default adminRoute;

