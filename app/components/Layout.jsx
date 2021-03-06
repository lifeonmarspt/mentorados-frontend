import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { translate } from "react-i18next";

import Header from "components/Header";
import Footer from "components/Footer";
import Toaster from "components/Toaster";
import Blocked from "components/Blocked";
import Loader from "components/Loader";

import { getCurrentUser } from "actions/session";
import { getMeta } from "actions/meta";

const ignoreFailure = (promise) => promise.catch(() => {});

class Layout extends React.Component {

  state = {
    loading: true,
  }

  componentWillMount() {
    this.getUserAndMeta();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.currentUser.id && nextProps.currentUser.id) {
      this.getUserAndMeta();
    }
  }

  getUserAndMeta() {
    const { getMeta, getCurrentUser } = this.props;

    this.setState({ loading: true });
    Promise.all([
      ignoreFailure(getCurrentUser()),
      ignoreFailure(getMeta()),
    ])
    .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { t, currentUser } = this.props;

    if (this.state.loading) return <Loader />;

    return (
      <div id="layout">
        <Header />

        <Route path="/admin" component={() => (
            <nav>
              <ul>
                <li><Link to="/admin/users">{t("admin:nav.users")}</Link></li>
                <li><Link to="/admin/mentors">{t("admin:nav.mentors")}</Link></li>
              </ul>
            </nav>
          )}
        />

        {currentUser.blocked
          ? <Blocked />
          : this.props.children
        }

        <Toaster />
        <Footer />
      </div>
    );
  }
}

export default compose(
  withRouter, // https://reacttraining.com/react-router/web/guides/redux-integration

  connect(
    ({ currentUser }) => ({ currentUser }),
    {
      getCurrentUser,
      getMeta,
    },
  ),

  translate([ "layout", "admin" ]),
)(Layout);

