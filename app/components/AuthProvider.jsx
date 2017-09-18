import React from "react";
import PropTypes from "prop-types";

import sessionStore from "lib/session";
import { setAuthorization, getUser } from "lib/api";

class AuthProvider extends React.Component {
  static childContextTypes = {
    session: PropTypes.object
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  state = {
    session: {},
    user: {},
    loading: true,
  }

  getChildContext() {
    return {
      session: {
        user: this.state.user,
        jwt: this.state.session.jwt,
        doLogin: this.doLogin.bind(this),
        doLogout: this.doLogout.bind(this),
        refreshUser: this.refreshUser.bind(this),
      },
    };
  }

  refreshUser(user) {
    this.setState({ user });
  }

  componentWillMount() {
    this.loadSession();
  }

  setSession(session) {
    setAuthorization(session);

    new Promise(
      (resolve, reject) => resolve(session.user.id)
    ).then(getUser).then(
      (response) => this.setState({ user: response.data, session, loading: false }),
    ).catch(
      () => this.setState({ user: {}, session: {}, loading: false }),
    );
  }

  loadSession() {
    this.setSession(sessionStore.load());
  }

  doLogin(session) {
    session = sessionStore.unpack(session.jwt);

    sessionStore.save(session);
    this.setSession(session);
  }

  doLogout() {
    sessionStore.save({});
    this.setSession({});

    this.context.router.history.push("/");
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return React.Children.only(this.props.children);
  }
}

export default AuthProvider;
