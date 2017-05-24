import React from "react";
import PropTypes from "prop-types";

import sessionStore from "lib/session";
import { setAuthorization } from "lib/api";

class AuthProvider extends React.Component {
  static childContextTypes = {
    session: PropTypes.object
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.state = {
      session: {},
      loading: true,
    };
  }

  componentWillMount() {
    this.loadSession();

    this.setState({ loading: false });
  }

  getChildContext() {
    return {
      session: {
        user: this.state.session.user,
        jwt: this.state.session.jwt,
        doLogin: this.doLogin.bind(this),
        doLogout: this.doLogout.bind(this),
      },
    };
  }

  setSession(session) {
    setAuthorization(session);

    this.setState({ session });
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
